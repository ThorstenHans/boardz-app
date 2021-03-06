#!/bin/bash

# This script can be used to issue a full rebuild of the electron app
# for development time build, you won't delete everything.
echo 'installing electron-packager...'
cd code
npm install electron-packager --no-save

echo 'building the angular app for production...'
npm run build --prod --base-ref="."
cd ..

echo 'generating temporary build dir...'
rm -rf .tmp-electron
mkdir .tmp-electron
cp code-electron/icon.png code-electron/index.js code-electron/package.json .tmp-electron
cp -rf dist/ .tmp-electron

echo 'building electron apps...'
rm -rf out
./code/node_modules/.bin/electron-packager .tmp-electron --electronVersion 1.7.9 --all --asar --icon ./gfx/icon --out out --overwrite


echo 'cleaning up...'
rm -rf .tmp-electron
open out
