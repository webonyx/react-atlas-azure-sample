#!/usr/bin/env bash

printenv

# Revision BUILD_SOURCEVERSION=0bf8206b92c27f46415f95faddf8f9f9c1bf4aa4
BRANCH=${BUILD_SOURCEBRANCHNAME:-main}

copyConfig() {
  if [ -f "$1" ]; then
    cp "$1" "$2"
  fi
}

set -xe

copyConfig ".env.${BRANCH}" .env.production.local
copyConfig "staticwebapp.${BRANCH}-config.json" staticwebapp.config.json

cat staticwebapp.config.json

yarn run build