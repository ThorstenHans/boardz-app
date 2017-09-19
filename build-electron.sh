#!/bin/bash

ECHO 'building the angular app for production...'
cd code
npm run build --prod --base-ref="."
cd ..

ECHO 'compiling electron instruction file...'
./code/node_modules/.bin/tsc ./code/electron/index.ts

ECHO 'generating temporary build dir...'
rm -rf .tmp-electron
mkdir .tmp-electron
cp code/electron/icon.png code/electron/index.js code/electron/package.json .tmp-electron
cp -rf dist/ .tmp-electron

ECHO 'building electron apps...'
rm -rf out
./code/node_modules/.bin/electron-packager .tmp-electron --all --asar --icon ./gfx/icon --out out --overwrite


ECHO 'cleaning up...'
rm -rf .tmp-electron
open out
