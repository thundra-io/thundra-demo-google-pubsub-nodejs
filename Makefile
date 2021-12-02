export THUNDRA_APIKEY = <YOUR-THUNDRA-API-KEY-HERE>
export THUNDRA_AGENT_TEST_PROJECT_ID = <YOUR-THUNDRA-PROJECT-ID-HERE>
export THUNDRA_AGENT_TRACE_INSTRUMENT_TRACEABLECONFIG=*.*[traceLineByLine=true]

usage:              ## Show this help
	@fgrep -h "##" $(MAKEFILE_LIST) | fgrep -v fgrep | sed -e 's/\\$$//' | sed -e 's/##//'

install:
	echo '####################### orderservice #################################' 
	npm install --prefix ./project/order-service
	echo '###################### stock-service #################################' 
	npm install --prefix ./project/stock-service
	echo '################# stock-movement-analytics ###########################' 
	npm install --prefix ./project/stock-movement-analytics
	echo '####################### e2e #################################' 
	npm install --prefix ./e2e

build:
	docker-compose -f ./docker/docker-compose.yml build

deploy:
	docker-compose -f ./docker/docker-compose.yml up

undeploy:	 
	docker-compose -f ./docker/docker-compose.yml down

test:
	npm --prefix ./e2e run test

.PHONY: usage install deploy undeploy test
