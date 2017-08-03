
const user = {
  state: {
    userInfo:{
      username:"admin",
      pass:"123456"
    }
  },

  mutations: {
      //提交用户信息方法，state是当前vuex实例下user的state，
      //newUserInfo是触发SET_USERINFO方法时的入参
      SET_USERINFO: (state, newUserInfo) => {
        state.userInfo = newUserInfo;
        console.log('新信息为:',state.userInfo)
      },
    },
    //Action 通过 store.dispatch 方法触发
    actions: {
      //newUserInfo为自己的传参
      setUserInfo({ dispatch,commit, state},newUserInfo){
        console.log('入参：',newUserInfo)
        commit('SET_USERINFO',newUserInfo)
      }
    } 
};

export default user;
