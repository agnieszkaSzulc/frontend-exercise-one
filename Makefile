export

.PHONY: dev-build dev-start clean

DEV_DC = docker-compose -f docker/docker-compose.dev.yml --env-file .env

dev-build:
	$(DEV_DC) build

dev-start:
	$(DEV_DC) up

clean:
	$(DEV_DC) stop
