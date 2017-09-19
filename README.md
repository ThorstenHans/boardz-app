# boardZ Single Page Application

## Requirements 

* Download and install [node.js](https://nodejs.org/)
* Make sure you have the [git command line tools](https://git-scm.com/downloads) installed
* Download and install [Atom](https://atom.io/) or another editor of your choice (free: `notepad`, [Visual Studio Code](https://code.visualstudio.com/); commercial: [Sublime Text](https://www.sublimetext.com/), [WebStorm](https://www.jetbrains.com/webstorm/))

## Requirements for Cordova

* Download and install the platform SDKs and/or emulators for the platform you want to develop for (this might take quite a while… so do this first!)
  * [XCode](https://developer.apple.com/xcode/download/)
  * [Android SDK](https://developer.android.com/sdk/index.html)
  * [Windows 10 SDK](https://dev.windows.com/en-us/downloads/windows-10-sdk)
* Install and install [ImageMagick](http://www.imagemagick.org/script/binary-releases.php) (base toolkit for image processing, here used for splash screen and icon generation)


## Android Settings

### SDK version

If you want to change [Android's SDK version](http://developer.android.com/guide/topics/manifest/uses-sdk-element.html), open [cordova/config.xml](cordova/config.xml) and search for `android-minSdkVersion` or `android-targetSdkVersion`:

* `android-minSdkVersion`: An integer designating the minimum API Level required for the application to run.
* `android-targetSdkVersion`: An integer designating the API Level that the application targets. If not set, the default value equals that given to minSdkVersion.

## Third-Party Libraries
### JavaScript, CSS
* [Angular2](https://angular.io/), JavaScript framework — HTML enhanced for web apps!
* [Bootstrap](http://getbootstrap.com/), responsive layout framework
* [AdminLTE](https://almsaeedstudio.com/preview), free responsive dashboard template
  * [Font Awesome](https://fortawesome.github.io/Font-Awesome/), free icon font
  * [jQuery](https://jquery.com/), JavaScript library required for AdminLTE
  * [winstore-jscompat](https://github.com/MSOpenTech/winstore-jscompat), fixes jQuery issues with Windows (Phone) 8 and 8.1 platforms
* [FastClick](https://github.com/ftlabs/fastclick), eliminates the [infamous 300 ms lag on touch devices](http://developer.telerik.com/featured/300-ms-click-delay-ios-8/)
* [HammerJS](http://hammerjs.github.io/), for touch interactions
* [FontAwesome](http://fontawesome.io) Images powered by font awesome
* [Leaflet](http://leafletjs.com/), an open-source JavaScript library for mobile-friendly interactive maps
* [pNotify](http://sciactive.com/pnotify/) UI notification library

### Native Wrappers
* [Cordova](https://cordova.apache.org/) for mobile apps
  * [Camera Plugin](https://github.com/apache/cordova-plugin-camera), allows native camera access
  * [Geolocation Plugin](https://github.com/apache/cordova-plugin-geolocation), allows access to geolocation
  * [Statusbar Plugin](https://github.com/apache/cordova-plugin-statusbar), allows modifying the statusbar
* [Electron](http://electron.atom.io/) for desktop applications
