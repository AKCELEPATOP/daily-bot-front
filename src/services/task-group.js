import Vue from 'vue';

export default {
    getTaskGroups() {
        return Vue.axios.get('/task-groups');
    }
}