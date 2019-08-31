ENVIRONMENT        ?= dev
PROJECT             = geja
AWS_DEFAULT_REGION ?= eu-west-1
BRANCH_NAME = $(shell git branch | grep \* | cut -d ' ' -f2)
COMMIT_HASH = $(shell git log -1 --format=%h)
TAGS = Environment=$(ENVIRONMENT) Project=$(PROJECT) GitBranch=$(BRANCH_NAME) GitCommit=$(COMMIT_HASH)
ARTIFACTS_BUCKET = irish-luck
STACK_NAME = $(PROJECT)-$(ENVIRONMENT)-frontend
DEPLOYMENT_BUCKET = $(PROJECT)-frontend-$(ENVIRONMENT)

package = aws cloudformation package \
    --template-file cloudformation.yml \
    --output-template-file dist/cloudformation.dist.yml \
    --s3-bucket $(ARTIFACTS_BUCKET) \
    --s3-prefix $(STACK_NAME)

deploy = aws cloudformation deploy --template-file dist/cloudformation.dist.yml \
    --stack-name $(STACK_NAME) \
    --region $(AWS_DEFAULT_REGION) \
    --parameter-overrides \
      ENVIRONMENT=$(ENVIRONMENT) \
      PROJECT=$(PROJECT) \
      DEPLOYMENTBUCKET=$(DEPLOYMENT_BUCKET) \
    --tags $(TAGS) \
    --capabilities CAPABILITY_IAM CAPABILITY_NAMED_IAM \
    --s3-bucket $(ARTIFACTS_BUCKET) \
    # --no-fail-on-empty-changeset


ifeq ($(ENVIRONMENT), prod)
	export REACT_APP_API_BASE_PATH = https://api.geja.se
else
	export REACT_APP_API_BASE_PATH = https://aws.triplehead.net/geja
endif

deploy:
	@echo "Resetting dist directory"
	@rm -rf dist
	@mkdir -p dist

	@echo "Building CloudFormation template"
	$(call package)
	@echo "-"

	@echo "Deploying CloudFormation stack"
	$(call deploy)
	@echo "-"

	@echo "Uploading React app"
	npx react-scripts build
	aws s3 sync \
	  --metadata GitBranch=$(BRANCH_NAME),GitCommit=$(COMMIT_HASH) \
	  build/ s3://$(DEPLOYMENT_BUCKET)

	@echo "Cleaning up"
	@rm -rf dist
	@echo "Done!"
