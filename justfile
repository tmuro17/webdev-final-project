_default:
    @just --list

deploy:
  docker compose up -d

build:
  just backend/build
  just frontend/build

redeploy: build
  docker compose up -d

down:
  docker compose down