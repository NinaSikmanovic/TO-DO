export default {
    namespaced: true,
    state: {
        show: false,
        text: '',
        color: 'success',
    },
    mutations: {
        showSnackbar(state, { text, color }) {
            state.text = text;
            state.color = color;
            state.show = true;
        },
        hideSnackbar(state) {
            state.show = false;
        },
    },
    actions: {
        showSnackbar({ commit }, { text, color }) {
            commit('showSnackbar', { text, color });
        },
        hideSnackbar({ commit }) {
            commit('hideSnackbar');
        },
    },
    getters: {
        snackbar(state) {
            return state;
        },
    },
};
