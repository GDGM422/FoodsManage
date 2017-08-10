import Vue from 'vue';
import Vuex from 'vuex';
import user from './modules/user';
import staff from './modules/staff';
import person from './modules/personalinfo';
import goods from './modules/goods'
import vip from './modules/vip';
import staffCost from './modules/staffCost';
import ordergoods from './modules/ordergoods.js'
import getters from './getters';
import cost from './modules/cost';
import stock from './modules/stock'

// import getters from './getters';

Vue.use(Vuex);

const store = new Vuex.Store({
	modules: {
    	user,staff,person,goods,vip,staffCost,cost,stock,ordergoods
    },
    getters
})

export default store;