#!/usr/bin/env bash

BRANCH=${BUILD_SOURCEBRANCHNAME:-main}

copyConfig() {
  if [ -f "$1" ]; then
    cp "$1" "$2"
  fi
}

set -xe

copyConfig ".env.${BRANCH}" .env.production.local
copyConfig ".ci/staticwebapp.${BRANCH}-config.json" staticwebapp.config.json

cat staticwebapp.config.json

yarn run build