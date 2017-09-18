export const environment = {
    production: true,
    authN: {
        url: 'http://boardz-id.azurewebsites.net/',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'http://boardz-api.azurewebsites.net/',
    offlineConfig: {
        checkInterval: 10000,
        maxDurationForGood: 50,
        maxDurationForNormal: 190,
        maxDurationForToSlow: 240,
        absoluteTimeoutAt: 320
    }
};
