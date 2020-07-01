import ProfileService from '../../services/profile';

const state = () => ({
    profile: null,
    isAuthenticated: false,
});

const getters = {
    profile: (state) => state.profile,
    isAuthenticated: (state) => state.isAuthenticated,
};

const mutations = {
    setProfile: (state, profile) => state.profile = profile,
    setAuthenticated: (state, isAuthenticated) => state.isAuthenticated = isAuthenticated,
};

const actions = {
    async loadProfile({commit, getters}) {
        if (getters.profile) {
            return;
        }
        const {data} = await ProfileService.getInfo();
        commit('setProfile', data);
    },
    logout({commit}) {
        commit('setProfile', null);
        commit('setAuthenticated', false);
    }
};

export default {
    namespaced: true,
    state: state(),
    getters,
    mutations,
    actions
}