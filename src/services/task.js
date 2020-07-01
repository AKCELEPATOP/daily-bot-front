import Vue from 'vue';

export default {
    getTasks(params) {
        return Vue.axios.get('/tasks', {params});
    }
}