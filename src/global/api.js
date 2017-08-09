/*
* @Author: admin
* @Date:   2017-08-09 14:51:34
* @Last Modified by:   admin
* @Last Modified time: 2017-08-09 15:09:54
*/

'use strict';
//接口配置

//把全体接口封装在的前端配置文件（序号与接口文档一一对应），多个环境配置时可快速切换整站式的全部接口，不用逐个页面去改。
const config = require('../../config');

let url = {
    apiUrl: "/ccp-web/api", //接口路径
    //ctxPath: "/ccp-web/dist", //tomcat服务dist目录
    ctxPath: "/dist", //node服务dist目录

    //staticPath:config.dev.staticPath,       //开发环境静态资源路径  
    staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath
};

//----------------请注意：如果正式环境，不需要本地json数据模拟，请删除以上代码和api中的模拟接口。----------------


export const api = {

            //'login':'http://localhost:80/dataJson/login.json',//ngxin
            'Cost':url.staticPath+'/dataJson/Cost.json',//登录模拟接口，正式环境请删除
            'cp':url.staticPath+'/dataJson/cp.json',//获取登录用户模拟接口
            'OrderData':url.staticPath+'/dataJson/OrderData.json',//表格模拟接口
            'stock':url.staticPath+'/dataJson/stock.json',//表单模拟接口
            "vipData":url.staticPath+"/dataJson/vipData.json",  //获取角色和对应用户  
            "workerData":url.staticPath+"/dataJson/workerData.json",  //获取用户的 菜单和元素权限 
            

            
    }