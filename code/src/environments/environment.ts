export const environment = {
    production: false,
    authN: {
        url: 'http://10.211.55.2:8001/',
        grant: 'password',
        clientId: 'ro',
        clientSecret: 'secret',
        scope: 'api'
    },
    apiRootUrl: 'http://10.211.55.4:8000/',
    offlineConfig: {
        checkInterval: 10000,
        maxDurationForGood: 50,
        maxDurationForNormal: 190,
        maxDurationForToSlow: 240,
        absoluteTimeoutAt: 320
    }
};
