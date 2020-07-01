import slack from './slack-provider';

export default {
    baseUrl: process.env.VUE_APP_API_HOST,
    storageType: 'cookieStorage',
    tokenPrefix: 'daily_bot',
    tokenHeader: 'Authorization',
    tokenType: 'Bearer',
    providers: {
        slack
    },
}