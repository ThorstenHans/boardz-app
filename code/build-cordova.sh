#!/bin/bash

ECHO 'building the angular app for production...'

npm run build --prod --base-ref="."

ECHO 'generating temporary build dir...'
rm -rf .tmp-cdv
mkdir -p .tmp-cdv/www

ECHO 'applying compiled angular app and cordova assets...'
cp -rf dist/ .tmp-cdv/www
cp ./cordova/config.xml ./cordova/package.json .tmp-cdv

cp -rf ./cordova/hooks ./.tmp-cdv


cd .tmp-cdv
ECHO 'restoring cordova dependencies for app...'
./../node_modules/.bin/cordova prepare
ECHO 'building app icon...'
./../node_modules/.bin/cordova-icon --icon="../../../gfx/icon.png"
ECHO 'building app spash screen...'
./../node_modules/.bin/cordova-splash --splash="../../../gfx/splash.png"

ECHO 'building cordova apps...'
./../node_modules/.bin/cordova build
cd ..
