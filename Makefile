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

# If env-specific config exists, source it.
# Note that the naming convention is important:
# - We want syntax highlighting
# - We want to easily gitignore these files
# - We dont want to conflict with create-react-app (https://create-react-app.dev/docs/adding-custom-environment-variables#what-other-env-files-can-be-used)
ifneq (,$(wildcard .$(ENVIRONMENT).env))
	include .$(ENVIRONMENT).env
	export $(shell sed 's/=.*//' .$(ENVIRONMENT).env)
endif

deploy:
	@echo "Building CloudFormation template for $(ENVIRONMENT)"
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

	@echo "Done!"
