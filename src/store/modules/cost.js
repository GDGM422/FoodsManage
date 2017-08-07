const cost= {
  	state: {
    	costlist:{
            "staff":[
              {"id":"01","name":"","job":"","pay":"","overtime":"500","award":"300"},
              {"id":"02","name":"","job":"","pay":"","overtime":"500","award":"300"},
              {"id":"03","name":"","job":"","pay":"","overtime":"0","award":"700"},
              {"id":"04","name":"","job":"","pay":"","overtime":"500","award":"300"},
              {"id":"05","name":"","job":"","pay":"","overtime":"500","award":"100"},
              {"id":"06","name":"","job":"","pay":"","overtime":"500","award":"300"},
              {"id":"07","name":"","job":"","pay":"","overtime":"300","award":"100"},
              {"id":"08","name":"","job":"","pay":"","overtime":"300","award":"100"},
              {"id":"09","name":"","job":"","pay":"","overtime":"300","award":"100"},
              {"id":"10","name":"","job":"","pay":"","overtime":"300","award":"100"},
              {"id":"11","name":"","job":"","pay":"","overtime":"300","award":"100"},
              {"id":"12","name":"","job":"","pay":"","overtime":"800","award":"500"}
            ],
            "pay":[
              {"thing":"水费","money":"500"},
              {"thing":"电费","money":"1500"},
              {"thing":"天然气","money":"800"},
              {"thing":"房租","money":"8500"}
            ],
            "kitchen":[
              {"thing":"米","count":"50","price":"100","money":"5000"},
              {"thing":"油","count":"30","price":"80","money":"2400"},
              {"thing":"盐","count":"10","price":"2","money":"20"},
              {"thing":"酱","count":"10","price":"10","money":"100"},
              {"thing":"醋","count":"5","price":"5","money":"25"},
              {"thing":"味精","count":"5","price":"20","money":"100"}
            ],
            "other":[
              {"thing":"装修","money":"20000"}

            ],
            "test":[
              {"thing":"测试","money":"12345"}
            ]
          }
  	},
  	mutations: {
	    SET_COST: (state, newcostlist) => {
	        state.costlist = newcostlist;
	        console.log('cost新数据为:',state.costlist)
	    },
    },
    //Action 通过 store.dispatch 方法触发
 	actions: {
      //newddlist为自己的传参
      setcost({ dispatch,commit, state},newcostlist){
        console.log('cost数据入参：',newcostlist)
        commit('SET_COST',newcostlist)
      }
    } 
};

export default cost;