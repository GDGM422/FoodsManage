/*
* @Author: admin
* @Date:   2017-08-04 10:26:18
* @Last Modified by:   admin
* @Last Modified time: 2017-08-04 10:28:18
*/

'use strict';

const person = {
  state: {
    personInfo:{
      username:"admin",
      trueName:"李四",
      sex:"man",
      job:"店长",
      email:"Don123@qq.com",
      introduction:'我的外号叫小四,呵呵!我的爱好是:听音乐、看书、打篮球。'
    }
  },

  mutations: {
      //提交用户信息方法，state是当前vuex实例下user的state，
      //newUserInfo是触发SET_USERINFO方法时的入参
      SET_PERSONINFO: (state, newPersonInfo) => {
        state.personInfo = newPersonInfo;
        console.log('新信息为:',state.personInfo)
      },
    },
    //Action 通过 store.dispatch 方法触发
    actions: {
      //newUserInfo为自己的传参
      setPersonInfo({ dispatch,commit, state},newPersonInfo){
        console.log('入参：',newPersonInfo)
        commit('SET_PERSONINFO',newPersonInfo)
      }
    } 
};

export default person;