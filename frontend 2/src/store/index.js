import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";
Vue.use(Vuex);

export default new Vuex.Store({
	strict: false,
	plugins: [createPersistedState()],
	state: {
		token: null,
		userId: null,
		username: null,
		avatar: null,
		isAdmin: 0,
		isLogged: false,
		snackbar: {},
	},
	mutations: {
		setToken(state, token) {
			state.token = token;
			state.isLogged = !!token; //vérifie si le token est défini ou null et renvoie true ou false
		},
		setAdmin(state, admin) {
			state.isAdmin = admin;
		},
		setUser(state, user) {
			state.userId = user;
		},
		setUsername(state, user) {
			state.username = user;
		},
		setSnackbar(state, snackbar) {
			state.snackbar = snackbar;
		},
		logout(state){
			state.token = ''
			state.userId = '',
			state.username = '',
			state.isAdmin = 0,
			state.isLogged = false,
			state.snackbar = {}
		},
	},
	actions: {
		setToken({ commit }, token) {
			commit("setToken", token);
		},
		setAdmin({ commit }, admin) {
			commit("setAdmin", admin);
		},
		setUser({ commit }, user) {
			commit("setUser", user);
		},
		setUsername({ commit }, user) {
			commit("setUsername", user);
		},
		setSnackbar({ commit }, snackbar) {
			snackbar.showing = true;
			snackbar.color = snackbar.color || "teal";
			commit("setSnackbar", snackbar);
		},
		logout({ commit }) {
			commit("logout")
		},
	},
});
