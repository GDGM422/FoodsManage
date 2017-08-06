/*
* @Author: admin
* @Date:   2017-08-03 14:21:11
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-05 14:14:30
*/

'use strict';
const staff = {
	state: {
    //人事
	    staffManagment:[]
	},
	mutations: {
      SET_STAFF: (state, newstaffManagment) => {
        state.staffManagment.push(newstaffManagment[0])
        console.log('人事添加新信息为:',state.staffManagment)
      },
    },
    //Action 通过 store.dispatch 方法触发
    actions: {
      //newstaffManagment为自己的传参
      setstaff({ dispatch,commit, state},newstaffManagment){
        console.log('人事添加入参：',newstaffManagment)
        commit('SET_STAFF',newstaffManagment)
      }
    } 

};
export default staff;