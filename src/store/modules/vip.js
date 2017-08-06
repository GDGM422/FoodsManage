/*
* @Author: Administrator
* @Date:   2017-08-06 11:18:34
* @Last Modified by:   Administrator
* @Last Modified time: 2017-08-06 11:22:10
*/

'use strict';


const vip = {
  state: {
  	"vipData": [
  		{
  			"vipID": "001",
  			"vipName": "张三",
  			"vipPhone": "13716515156",
  			"vipJoinDate": "2017-09-22",
  			"vipScore": "640",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		},{
  			"vipID": "002",
  			"vipName": "张三",
  			"vipPhone": "13826468745",
  			"vipJoinDate": "2016-08-15",
  			"vipScore": "650",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		},{
  			"vipID": "003",
  			"vipName": "张三",
  			"vipPhone": "13906547485",
  			"vipJoinDate": "2010-02-26",
  			"vipScore": "580",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		},{
  			"vipID": "604",
  			"vipName": "张三",
  			"vipPhone": "13526484565",
  			"vipJoinDate": "2013-06-28",
  			"vipScore": "1000",
  			"vipGrade": "银",
  			"vipDiscount": "8折"
  		},{
  			"vipID": "205",
  			"vipName": "张三",
  			"vipPhone": "13357896952",
  			"vipJoinDate": "2010-05-16",
  			"vipScore": "1330",
  			"vipGrade": "金",
  			"vipDiscount": "7折"
  		},{
  			"vipID": "006",
  			"vipName": "张三",
  			"vipPhone": "13985296325",
  			"vipJoinDate": "2011-04-23",
  			"vipScore": "610",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		},{
  			"vipID": "007",
  			"vipName": "张三",
  			"vipPhone": "13718515156",
  			"vipJoinDate": "2017-05-22",
  			"vipScore": "1200",
  			"vipGrade": "银",
  			"vipDiscount": "8折"
  		},{
  			"vipID": "008",
  			"vipName": "张三",
  			"vipPhone": "13526468745",
  			"vipJoinDate": "1996-08-15",
  			"vipScore": "625",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		},{
  			"vipID": "009",
  			"vipName": "张三5",
  			"vipPhone": "13306547485",
  			"vipJoinDate": "2015-02-26",
  			"vipScore": "360",
  			"vipGrade": "铜",
  			"vipDiscount": "9折"
  		}
  	]
  },
  mutations: {
      SET_VIPDATE: (state, newvipData) => {
        state.vipData = newvipData;
        console.log('vip信息为:',state.vipData)
      },
    },
    actions: {
      setVipDate({ dispatch,commit, state},newvipData){
        console.log('vip数据入参：',newvipData)
        commit('SET_VIPDATE',newvipData)
      }
    } 
};

export default vip;
