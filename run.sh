#!/usr/bin/env bash

# It's important not to add any params to tsc because that will ignore tsconfig.json
tsc app
node app.js --harmony