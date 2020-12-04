default: dev

.PHONY: build

bash: build_bash
	docker-compose -f build/docker-compose.yaml -p learn_hangul run bash bash

build_bash:
	docker-compose -f build/docker-compose.yaml -p learn_hangul build bash

build:
	docker-compose -f build/docker-compose.yaml -p learn_hangul build app

dev: down build
	docker-compose -f build/docker-compose.yaml -p learn_hangul up app

down:
	docker-compose -f build/docker-compose.yaml -p learn_hangul down -v


cordova_build: build
	docker build -t hangul_cordova -f build/cordova.dockerfile .

cordova: cordova_build
	docker run \
			-it \
			-v $(shell pwd)/dist:/dist \
			-v $(shell pwd)/app/src:/app/src \
			-v $(shell pwd)/app/public:/app/public \
			-v $(shell pwd)/build/config.xml:/cordova/hangul/config.xml \
								hangul_cordova bash

cordova_prod: cordova_build
	docker run \
			-it \
			-v $(shell pwd)/dist:/dist \
			-v $(shell pwd)/secret:/secret \
			-v $(shell pwd)/app/src:/app/src \
			-v $(shell pwd)/app/public:/app/public \
			-v $(shell pwd)/build/config.xml:/cordova/hangul/config.xml \
								hangul_cordova bash -c "\
																		build-app; \
																		cd /cordova/hangul; \
																		rm -rf www; \
																		mv /app/dist www; \
																		cordova build android \
								--release \
								-- \
								--keystore /secret/learn-hangul.keystore \
								--alias mcr \
								--storePassword=$(keystore_pass) \
								--password=$(keystore_pass) && \
								cp /cordova/hangul/platforms/android/app/build/outputs/apk/release/app-release.apk /dist/app-release.apk"

prod_build:
	docker build -f build/production.dockerfile -t kevashcraft/learn-hangul:latest .

prod_push: prod_build
	docker push kevashcraft/learn-hangul:latest

upgrade: prod_build prod_push
	helm upgrade learn-hangul build/chart

install: prod_push
	helm install learn-hangul build/chart
