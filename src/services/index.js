import Vue from 'vue'
import VueAxios from 'vue-axios'
import axios from 'axios';
import store from '../store';

Vue.use(VueAxios, axios);

Vue.axios.defaults.baseURL = process.env.VUE_APP_API_HOST;

Vue.axios.interceptors.request.use(
    (config) => {
        const auth = window.$vue.$auth;
        const tokenHeader = auth.options.tokenHeader;
        const token = auth.getToken();
        if (token) {
            config.headers[tokenHeader] = [
                auth.options.tokenType, token
            ].join(' ');
        }

        return config;
    }
);

const UNAUTHORIZED = 401;
Vue.axios.interceptors.response.use(
    response => response,
    async (error) => {
        const {status} = error.response;
        if (
            status === UNAUTHORIZED &&
            window.$router.currentRoute &&
            window.$router.currentRoute.name !== 'login'
        ) {
            await store.dispatch('profile/logout');
            await window.$router.push({name: 'login'});
        }
        await Promise.reject(error);
    }
);