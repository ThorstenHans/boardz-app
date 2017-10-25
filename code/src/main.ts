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

// ijs demo hook: cordova 1
bootstrapNgApp();
