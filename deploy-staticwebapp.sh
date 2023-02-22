#!/usr/bin/env bash

set -xe

cp .env.main .env.production.local
source .env.main

printenv

yarn run build