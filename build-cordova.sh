#!/bin/bash

echo 'building the angular app for production...'
cd code
npm install cordova --no-save
npm install cordova-icon --no-save
npm install cordova-splash --no-save
npm run build --prod --base-ref="."
cd ..
echo 'generating temporary build dir...'
rm -rf .tmp-cdv
mkdir -p .tmp-cdv/www

echo 'applying compiled angular app and cordova assets...'
cp -rf dist/ .tmp-cdv/www
cp ./code/cordova/config.xml ./code/cordova/package.json .tmp-cdv

cp -rf ./code/cordova/hooks ./.tmp-cdv


cd .tmp-cdv
echo 'restoring cordova dependencies for app...'
../code/node_modules/.bin/cordova prepare
echo 'building app icon...'
../code/node_modules/.bin/cordova-icon --icon="../gfx/icon.png"
echo 'building app spash screen...'
../code/node_modules/.bin/cordova-splash --splash="../gfx/splash.png"

echo 'building cordova apps...'
../code/node_modules/.bin/cordova build
cd ..

echo ''
echo 'to run the app execute "cd .tmp-cdv && ../code/node_modules/.bin/cordova emulate ios"'