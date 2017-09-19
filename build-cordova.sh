#!/bin/bash

ECHO 'building the angular app for production...'
cd code
npm run build --prod --base-ref="."
cd ..
ECHO 'generating temporary build dir...'
rm -rf .tmp-cdv
mkdir -p .tmp-cdv/www

ECHO 'applying compiled angular app and cordova assets...'
cp -rf dist/ .tmp-cdv/www
cp ./code/cordova/config.xml ./code/cordova/package.json .tmp-cdv

cp -rf ./code/cordova/hooks ./.tmp-cdv


cd .tmp-cdv
ECHO 'restoring cordova dependencies for app...'
../code/node_modules/.bin/cordova prepare
ECHO 'building app icon...'
../code/node_modules/.bin/cordova-icon --icon="../gfx/icon.png"
ECHO 'building app spash screen...'
../code/node_modules/.bin/cordova-splash --splash="../gfx/splash.png"

ECHO 'building cordova apps...'
../code/node_modules/.bin/cordova build
cd ..
