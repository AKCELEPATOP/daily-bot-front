import Vue from 'vue';
import TaskService from '../../services/task';
import {groups} from "../../modules/task/constants";
import {TASK_FILTERS} from "../../modules/filter/constants";
import {renderForRequest} from "../../modules/filter/utils";

const state = () => ({
    tasks: {},
    filters: {
        [TASK_FILTERS.FILTER_USER_ID]: null,
        [TASK_FILTERS.FILTER_DATE_FROM]: null,
        [TASK_FILTERS.FILTER_DATE_TO]: null,
        [TASK_FILTERS.FILTER_SELF]: null,
    },
    isLocked: false, // блокировка функции загрузки
});

const getters = {
    tasks: (state) => (key) => {
        let list = state.tasks[key];
        return list ? list.map : null;
    },
    meta: (state) => (key) => {
        let list = state.tasks[key];
        return list ? list.meta : null;
    },
    filters: (state) => state.filters,
    isLocked: (state) => state.isLocked,
};

const mutations = {
    addTasks: (state, {key, value}) => {
        if (!state.tasks[key]) {
            Vue.set(state.tasks, key, {meta: null, map: []});
        }
        const list = state.tasks[key];
        value.forEach((task) => {
            list.map.push(task)
        });
    },
    setMeta: (state, {key, meta}) => {
        if (!state.tasks[key]) {
            return;
        }
        state.tasks[key].meta = meta;
    },
    clearTasks: (state) => {
        Vue.set(state, 'tasks', {});
    },
    setFilter: (state, {field, value}) => {
        state.filters[field] = value;
    },
    updateFilters: (state, filters) => {
        filters.forEach(({field, value}) => {
            state.filters[field] = value;
        });
    },
    setLocked: (state, isLocked) => state.isLocked = isLocked,
};

const actions = {
    async loadTasks({commit, getters}, searchParams) {
        if (getters.isLocked) {
            return;
        }

        const {groupId} = searchParams;
        const meta = getters.meta(groupId);
        const filters = Object
            .entries(getters.filters)
            .reduce(
                (res, [field, value]) => {
                    if (value) {
                        res[field] = renderForRequest({field, value});
                    }
                    return res;
                },
                {}
            );
        const params = {...searchParams, ...filters};
        if (meta) {
            params.page = +meta.currentPage + 1;
            params.limit = meta.itemsPerPage;
        }
        try {
            const {data: {items, meta: newMeta}} = await TaskService.getTasks(params);
            commit('addTasks', {key: groupId, value: items});
            commit('setMeta', {key: groupId, meta: newMeta});
        } catch (e) {
            if (e.response.status === 401) {
                return false;
            }

            throw new Error('Не удалось загрузить данные');
        }
    },
    /**
     * Обновление фильтров и перезагрузка задач
     *
     * @param commit
     * @param dispatch
     * @param {FilterChangedEvent[]} payload
     * @return {Promise<void>}
     */
    async updateFilters({commit, dispatch}, payload) {
        commit('updateFilters', payload);
        commit('setLocked', true);
        commit('clearTasks');
        try {
            await Promise.all(groups.map(({active}) => dispatch('loadTasks', {active})));
        } finally {
            commit('setLocked', false)
        }
    }
};

export default {
    namespaced: true,
    state: state(),
    getters,
    mutations,
    actions
}

/**
 * @typedef FilterChangedEvent
 * @global
 * @property {string} field
 * @property {*} value
 */
