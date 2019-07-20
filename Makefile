ENVIRONMENT        ?= dev
PROJECT             = geja
AWS_DEFAULT_REGION ?= eu-north-1
BRANCH_NAME = $(shell git branch | grep \* | cut -d ' ' -f2)
COMMIT_HASH = $(shell git log -1 --format=%h)
TAGS = Environment=$(ENVIRONMENT) Project=$(PROJECT) GitBranch=$(BRANCH_NAME) GitCommit=$(COMMIT_HASH)
DEPLOYMENT_BUCKET = geja-cloud-frontend

deploy:
	npx react-scripts build
	aws s3 sync \
	  --metadata GitBranch=$(BRANCH_NAME),GitCommit=$(COMMIT_HASH) \
	  build/ s3://$(DEPLOYMENT_BUCKET)
