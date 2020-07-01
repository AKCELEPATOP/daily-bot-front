import Vue from 'vue'
import Vuex from 'vuex'
import profile from './modules/profile';
import task from './modules/task';
import taskGroup from './modules/task-group';

Vue.use(Vuex);

const store = new Vuex.Store({
    modules: {
        profile,
        task,
        taskGroup
    },
});

export default store;
