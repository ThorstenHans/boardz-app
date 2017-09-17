import {enableProdMode} from '@angular/core';
import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';

import {AppModule} from './app/modules/app.module';
import {environment} from './environments/environment';

if (environment.production) {
    enableProdMode();
}

const bootstrapNgApp = () => {
    platformBrowserDynamic().bootstrapModule(AppModule);
};

if (window.hasOwnProperty('cordova')) {
    window.document.addEventListener('deviceready', bootstrapNgApp, false);

} else if (location.search.indexOf('?_host_Info') > -1) {
    Office.initialize = bootstrapNgApp;
}else{
    bootstrapNgApp();
}
