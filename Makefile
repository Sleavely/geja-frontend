ENVIRONMENT        ?= dev
PROJECT             = geja
AWS_DEFAULT_REGION ?= eu-north-1
BRANCH_NAME = $(shell git branch | grep \* | cut -d ' ' -f2)
COMMIT_HASH = $(shell git log -1 --format=%h)
TAGS = Environment=$(ENVIRONMENT) Project=$(PROJECT) GitBranch=$(BRANCH_NAME) GitCommit=$(COMMIT_HASH)
ARTIFACTS_BUCKET = geja-cloud-frontend

deploy:
	npx react-scripts build
	aws s3 sync build/ s3://$(ARTIFACTS_BUCKET)
