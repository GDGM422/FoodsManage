import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { Loading } from 'element-ui';
const {themeArray} = require('./themeArray');
const config = require('../../config');

export  const global = {
        staticPath: process.env.NODE_ENV !== 'development' ?  config.build.staticPath: config.dev.staticPath,//静态资源路径
        /**
         * 切换主题函数
         */
        changeTheme:function(themeValue){
            var that = this;
            var cssArray = themeArray;

            for (let i = 0 ,len = cssArray.length; i < len; i++) {
            	// itemPath 切换特定到颜色的地址
                // cssArray[i] 主题文件的数组
                var itemPath = that.staticPath+'/theme/'+themeValue+'/'+cssArray[i].toLowerCase()+'.css';
                loadCss(itemPath)
                //console.log('itemPath的地址：',itemPath);
                //console.log("打印cssArray[i]：",cssArray[i])
                //console.log("cssArray:",cssArray)
            };
            
            localStorage.setItem("themeValue",themeValue)
            //console.log("打印出所选中的颜色：",localStorage)

            function loadCss(path){
                var head = document.getElementsByTagName('head')[0];//返回带有指定标签名的对象的集合
                var link = document.createElement('link');//创建元素节点
                    link.href = path;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);//appendChild在列表中添加项目
                    console.log("head打印",head);
              
            }
        }        
};
    

