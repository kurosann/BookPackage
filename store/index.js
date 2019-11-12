import Vue from 'vue';
import Vuex from 'vuex';
Vue.use(Vuex);

import music from './music';
import novel from './novel';


export default new Vuex.Store({
	modules: {
		music,
		novel
	}
});