import TaskGroupService from '../../services/task-group';

const state = () => ({
    groups: null,
});

const getters = {
    groups: (state) => state.groups,
};

const mutations = {
    setGroups: (state, groups) => state.groups = groups,
};

const actions = {
    async loadGroups({commit}) {
        const {data} = await TaskGroupService.getTaskGroups();
        commit('setGroups', data);
    },
};

export default {
    namespaced: true,
    state: state(),
    getters,
    mutations,
    actions,
};
