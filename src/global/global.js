import Vue from 'vue';
import VueResource from 'vue-resource';
Vue.use(VueResource);
import { Loading } from 'element-ui';
const {themeArray} = require('./themeArray');

export  const global = {
        /**
         * 切换主题函数
         */
        changeTheme:function(themeValue){
            var that = this;
            var cssArray = themeArray;

            for (let i = 0 ,len = cssArray.length; i < len; i++) {
                var itemPath = '/static/'+'/theme/'+themeValue+'/'+cssArray[i].toLowerCase()+'.css';
                loadCss(itemPath)
            };
            
            localStorage.setItem("themeValue",themeValue)

            function loadCss(path){
                var head = document.getElementsByTagName('head')[0];
                var link = document.createElement('link');
                    link.href = path;
                    link.rel = 'stylesheet';
                    link.type = 'text/css';
                    head.appendChild(link);
                    console.log("head打印",head);
              
            }
        }        
};
    

