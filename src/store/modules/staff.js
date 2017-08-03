/*
* @Author: admin
* @Date:   2017-08-03 14:21:11
* @Last Modified by:   admin
* @Last Modified time: 2017-08-03 15:55:52
*/

'use strict';
const staff = {
	state: {
    //人事
	    staffManagment:[]
	},
	mutations: {
      //提交用户信息方法，state是当前vuex实例下user的state，
      //newUserInfo是触发SET_USERINFO方法时的入参
      SET_STAFF: (state, newstaffManagment) => {
        //state.staffManagment = newstaffManagment;
        state.staffManagment.push(newstaffManagment[0])
        console.log('新信息为:',state.staffManagment)
      },
    },
    //Action 通过 store.dispatch 方法触发
    actions: {
      //newstaffManagment为自己的传参
      setstaff({ dispatch,commit, state},newstaffManagment){
        console.log('入参：',newstaffManagment)
        commit('SET_STAFF',newstaffManagment)
      }
    } 

};
export default staff;