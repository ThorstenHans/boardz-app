export const environment = {
    production: true,
    authN: {
        url: 'https://boardz-id.azurewebsites.net/',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'https://boardz-api.azurewebsites.net/',
    offlineConfig: {
        enabled: false,
        checkInterval: 5000,
        maxDurationForGood: 240,
        maxDurationForNormal: 500,
        maxDurationForToSlow: 800,
        absoluteTimeoutAt: 1200
    }
};
