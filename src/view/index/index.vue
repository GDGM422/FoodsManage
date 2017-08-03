<template style="width: 100%;height: 100%;">
	<div id="index">
		<div class="app-top">
	      <div style="float:left;margin-left:5px;"><img src="../../assets/images/logo.jpg"/></div>
	      <div style="float:left;margin:10px;font-size:18px;color:#896044;">
	        餐饮后台管理系统
	      </div>
	      <div class="content-right">
	      	<i class="fa fa-user-o" aria-hidden="true" style="font-size:25px"></i>
	      	<span v-if="">
	      		{{ personalInfo.username}}
	      	</span>
	      	
	      	<el-button type="text" @click="editlogin">退出登录</el-button>
	      </div>
    	</div>
		<div class="content-wrapper">
		  <div class="nav">               
		       <el-row class="tac">
		        <el-col :span="26">
		            <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark">
		            	<router-link to="/index/message">
		            		<el-menu-item index="1"><i class="fa fa-home" aria-hidden="true" style="font-size:20px;margin-right: 5px; "></i>首页</el-menu-item>
		            	</router-link>

		            	
			            <el-submenu index="2">
        	                <template slot="title"><i class="el-icon-message"></i>人事管理</template>
        	                <router-link to="/renshi/worker"><el-menu-item index="2-2">管理员工</el-menu-item></router-link>
        	                <router-link to="/renshi/staff_add"><el-menu-item index="2-1" >添加员工</el-menu-item></router-link>
			            </el-submenu>

		              	<router-link to="/vip/associator">
		              		<el-menu-item index="3"><i class="el-icon-star-on"></i>会员管理
		              		</el-menu-item>
		              	</router-link>	

		              	<router-link to="/foods/goods">
		              		<el-menu-item index="4"><i class="el-icon-setting"></i>商品管理
		              		</el-menu-item>
		              	</router-link>	
			           
			           
			            <router-link to="/order/index">
			            	<el-menu-item index="5"><i class="el-icon-document"></i>订单管理</el-menu-item>
			            </router-link>	
			                 
			            
			            <el-submenu index="6">
			                <template slot="title"><i class="el-icon-menu"></i>库存管理</template>
			                  <router-link to="/stock/stock"><el-menu-item index="6-1">查看库存</el-menu-item></router-link>	
			                  <router-link to="/stock/operatingStock"><el-menu-item index="6-2">操作库存</el-menu-item></router-link>	
			            </el-submenu>
			           <!--  <router-link to="/index">
			            	<el-menu-item index="6"><i class="el-icon-menu"></i>库存管理</el-menu-item>
			            </router-link> -->

		              	<router-link to="/Cost/index">
		              		<el-menu-item index="7"><i class="el-icon-date"></i>成本管理</el-menu-item>
		                </router-link>

		            </el-menu>
		          </el-col>
		      </el-row>
		    </div>
		 	<div class="right">
		 		<div class="crumbs">
			 		<el-breadcrumb separator="/">
				 		<el-breadcrumb-item v-for="(item,index) in brumblist" :key="index">
					 		  	<router-link :to="item.path">{{item.meta.breadcrumbName}}</router-link>
					        	<router-link class="separator" v-if="index !== brumblist.length-1">{{separator}}</router-link>
				 		</el-breadcrumb-item>
			 		</el-breadcrumb>
		 		</div>
		 		<router-view></router-view>
		 	</div>
		</div>
	</div>
	
</template>
<script>
import store from '../../store/index';
	export default {
		name: 'index',
		created() {
	        this.getBreadcrumb()
	    },
		data() {
			return{
				personalInfo : store.state.user.userInfo,
				brumblist: '' // 路由集合
			}
		},

	    mounted:function(){
	      console.log( store.state.user.userInfo)
	     
	    } ,
	    methods:{
	    	editlogin:function(){
	    		this.$router.push({ path: '/' });
	    	},
	    	getBreadcrumb () {
	    	    this.brumblist = this.$route.matched;
	    	    this.$route.matched.forEach((item, index) => {
	    	      // 判断父级路由是否为空字符串或者meta是否为首页,直接复写路径到根目录
	    	      // 后面的就是判断路由和当前遍历的项目是否一致,是的话把标题的值给上
	    	      item.meta.breadcrumbName === '首页' ? item.path = '/index/readme' : this.$route.path === item.path ? this.title = item.meta.breadcrumbName : '';
	    	    })
	    	}
	    },
		props: ['separator'], 
	    watch: {
	        $route () {
	            this.getBreadcrumb();
	        }
	    }
	}
</script>


<style>

	.app-top{
	  position: fixed;
	  width:100%;
	  height:50px;
	  border-bottom:1px solid #000000;
	  top:0;
	  bottom: 0;
	  left:0;
	  right:0;
	}
	.content-wrapper{
	  position: fixed;
	  top:60px;
	  bottom: 0;
	  left:0;
	  right: 0;
	  height: 100%;
	  width: 100%;
	}
	.content-right{
		float: right;
		margin-top: 10px;
		margin-right: 50px;
	}
	.nav{
	  position:fixed;
	  top:50px;
	  bottom: 10px;
	  left:0;
	  right: 0;
	  width:200px;
	  background-color: #324157;
	}

	.right{
	  position:absolute;
	  top:0;
	  bottom: 70px;
	  left:210px;
	  right: 0;
	  overflow-y:scroll;
	  overflow-x:hidden;
	}
	.crumbs{
		margin-bottom: 20px;
	}
	
</style>