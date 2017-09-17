#!/bin/bash

ECHO 'building the angular app for production...'

npm run build --prod --base-ref="."

ECHO 'compiling electron instruction file...'
./node_modules/.bin/tsc ./electron/index.ts

ECHO 'generating temporary build dir...'
rm -rf .tmp
mkdir .tmp
cp electron/icon.png electron/index.js electron/package.json .tmp
cp -rf dist/ .tmp

ECHO 'building electron apps...'
rm -rf out
./node_modules/.bin/electron-packager .tmp --all --asar --icon ../../gfx/icon --out out --overwrite


ECHO 'cleaning up...'
rm -rf .tmp
open out
