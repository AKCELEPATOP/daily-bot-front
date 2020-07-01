const isUndefined = (value) => {
    return typeof value === 'undefined'
};

const fakeWindow = () => ({
    atob: function atob() {
    },
    open: function open() {
    },
    location: {},
    localStorage: {
        setItem: function setItem() {
        },
        getItem: function getItem() {
        },
        removeItem: function removeItem() {
        },
    },
    sessionStorage: {
        setItem: function setItem() {
        },
        getItem: function getItem() {
        },
        removeItem: function removeItem() {
        },
    },
});

const $window = () => ((typeof window !== undefined)
    ? window
    : fakeWindow);

// eslint-disable-next-line no-unused-vars
const getRedirectUri = (uri) => {
    try {
        return (!isUndefined(uri))
            ? `${$window.location.origin}${uri}`
            : $window.location.origin

    }
        // eslint-disable-next-line no-empty
    catch (e) {}

    return uri || null;
};

let top = window.screen.height - 600;
top = top > 0 ? top/2 : 0;

let left = window.screen.width - 400;
left = left > 0 ? left/2 : 0;

export default {
    authorizationEndpoint: 'https://slack.com/oauth/authorize',
    url: 'auth/slack/callback',
    clientId: process.env.VUE_APP_SLACK_CLIENT,
    redirectUri: process.env.VUE_APP_HOST + '/auth/callback',
    requiredUrlParams: ['scope', 'state'],
    scope: ['identity.basic', 'identity.email', 'identity.avatar', 'identity.team'],
    scopeDelimiter: ' ',
    oauthType: '2.0',
    display: 'popup',
    popupOptions: { width: 500, height: 560, left, top },
    state: 'confirmed'
}