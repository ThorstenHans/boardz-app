export const environment = {
    production: false,
    authN: {
        url: 'https://boardz-id.azurewebsites.net/',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'https://boardz-api.azurewebsites.net/',
    offlineConfig: {
        checkInterval: 10000,
        maxDurationForGood: 240,
        maxDurationForNormal: 320,
        maxDurationForToSlow: 450,
        absoluteTimeoutAt: 600
    }
};
