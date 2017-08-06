import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import staff from './modules/staff';
import person from './modules/personalinfo';
import goods from './modules/goods'
import getters from './getters';

// import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	user,staff,person,goods 
    },
    getters
})

export default store;