#!/bin/bash

# This script can be used to issue a full rebuild of the cordova app
# for development time build, you won't delete everything.
# you want to keep changes from iOS proj...

echo 'installing cordova tooling...'
cd code
npm install cordova cordova-icon cordova-splash --no-save

echo 'building the angular app for production...'
npm run build --prod --base-ref="."
cd ..

echo 'generating temporary build dir...'
rm -rf .tmp-cdv
mkdir -p .tmp-cdv/www

echo 'applying compiled angular app and cordova assets...'
cp -rf dist/ .tmp-cdv/www
rm .tmp-cdv/www/cordova.js
cp ./code-cordova/config.xml ./code-cordova/package.json .tmp-cdv
cp -rf ./code-cordova/hooks ./.tmp-cdv
cd .tmp-cdv

echo 'restoring cordova dependencies for app...'
cordova prepare

echo 'building app icon...'
./../code/node_modules/.bin/cordova-icon --icon="../gfx/icon.png"

echo 'building app spash screen...'
./../code/node_modules/.bin/cordova-splash --splash="../gfx/splash.png"

echo 'building cordova apps...'
cordova build
cd ..

echo ''
echo 'to run the app execute "cd .tmp-cdv && cordova emulate ios"'
