/*
* @Author: lenovo
* @Date:   2017-08-05 14:07:09
* @Last Modified by:   lenovo
* @Last Modified time: 2017-08-06 09:57:21
*/

'use strict';

const goods = {
  	state: {
    	goodslist:[
                { "cp_num":"1","cp_name": "虾饺","cp_type": "小吃","cp_price": "10"}, 
                { "cp_num":"2","cp_name": "虾饺","cp_type": "小吃","cp_price": "10"}, 
                { "cp_num":"3","cp_name": "虾饺","cp_type": "小吃","cp_price": "10"}, 
                { "cp_num":"4","cp_name": "虾饺","cp_type": "小吃","cp_price": "10"}, 
                { "cp_num":"5","cp_name": "虾饺","cp_type": "小吃","cp_price": "10"}, 
                { "cp_num":"6","cp_name": "凤爪","cp_type": "小吃","cp_price": "15"}, 
                { "cp_num":"7","cp_name": "凤爪","cp_type": "小吃","cp_price": "15"}, 
                { "cp_num":"8","cp_name": "凤爪","cp_type": "小吃","cp_price": "15"}, 
                { "cp_num":"9","cp_name": "凤爪","cp_type": "小吃","cp_price": "15"}, 
                { "cp_num":"10","cp_name": "凤爪","cp_type": "小吃","cp_price": "15"}
                ]
  	},
  	mutations: {
	    SET_GOODS: (state, newgoodslist) => {
	        state.goodslist = newgoodslist;
	        console.log('商品新数据为:',state.goodslist)
	    },
    },
    //Action 通过 store.dispatch 方法触发
 	actions: {
      //newddlist为自己的传参
      setGoods({ dispatch,commit, state},newgoodslist){
        console.log('商品数据入参：',newgoodslist)
        commit('SET_GOODS',newgoodslist)
      }
    } 
};

export default goods;