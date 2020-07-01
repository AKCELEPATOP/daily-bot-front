import Vue from 'vue';

export default {
    getInfo() {
        return Vue.axios.get('/users/info');
    },
    /**
     *
     * @param {GetUsersParams} params
     * @return {Promise<any>}
     */
    getUsers(params) {
        return Vue.axios.get('/users', {params})
    },
    getUser(id) {
        return Vue.axios.get(`/users/${id}`);
    }
}

/**
 * @typedef GetUsersParams
 * @global
 * @property {string} search
 */