import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
	state: {
		msg: 123,
	},
	mutations: {
		increment(state) {
			state.msg++;
		},
	},
	actions: {},
	modules: {},
});
