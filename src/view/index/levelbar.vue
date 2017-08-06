<template>
<!-- 面包屑导航 -->
	<div class="app-levelbar">
   		<el-breadcrumb separator="/">
  	 		<el-breadcrumb-item v-for="(item,index) in brumblist" :key="index">
  		 		  	<router-link :to="item.path">{{item.meta.breadcrumbName}}</router-link>
  		        	<router-link class="separator" v-if="index !== brumblist.length-1">{{separator}}</router-link>
  	 		</el-breadcrumb-item>
   		</el-breadcrumb>
	</div>
</template>

<script>
	export default {
  		created() {
	        this.getBreadcrumb()
	    },
      	data() {
        	return {
          		title:"",
				brumblist: '' // 路由集合
        	}
      },
      props: ['separator'], 
      methods: {
        getBreadcrumb () {
    	    this.brumblist = this.$route.matched;
    	    this.$route.matched.forEach((item, index) => {
    	      // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
    	      // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
    	      item.meta.breadcrumbName === '首页' ? item.path = '/index/readme' : this.$route.path === item.path ? this.title = item.meta.breadcrumbName : '';
    	    })
	    }
      },
      watch: {
        $route() {
          this.getBreadcrumb();
        }
      }
    }

	
</script>

<style>
	.app-levelbar.el-breadcrumb {
        display: inline-block;
        font-size: 14px;
        line-height: 50px;
        margin-left: 10px;
        .no-redirect{
          color: #97a8be;
          cursor:text;
        }
    }
</style>