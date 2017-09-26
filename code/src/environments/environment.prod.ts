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
        checkInterval: 5000,
        maxDurationForGood: 120,
        maxDurationForNormal: 280,
        maxDurationForToSlow: 360,
        absoluteTimeoutAt: 400
    }
};
