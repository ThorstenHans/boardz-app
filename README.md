#boardZ - Single Page Application (SPA)

The SPA is part of a complete sample application. If you're interested in running and using the application on your own hardware, consider exploring the parent repository.

[https://github.com/ThorstenHans/boardz](https://github.com/ThorstenHans/boardz)

## About boardZ

*boardZ* is a small application used to manage classical board games. The SPA has been built using [Angular](https://angular.io).

## Cross platform mobile apps

Mobile apps can be built using [Apache Cordova](http://cordova.apache.org). Consider executing the build script `./build-cordova.sh` to generate mobile apps. 

> The build script is actually doing a full re-build. For development or production builds consider implementing incremental builds. This has been build for demonstration purpose.  

## Cross platform desktop apps

Mobile apps can be built using [GitHub Electron](http://electron.atom.io). Consider executing the build script `./build-electron.sh` to generate desktop apps for all platforms. 

> The build script is actually doing a full re-build. For development or production builds consider implementing incremental builds. This has been build for demonstration purpose.

## Web App

The project itself has been built using `@angular/cli`, that said, you can run the application either by executing `npm start` or `ng serve` (if you've installed `@angular/cli` globally).
