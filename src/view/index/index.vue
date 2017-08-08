<template style="width: 100%;height: 100%;">
	<div id="index">
		<div class="app-top">
	      <div style="float:left;margin-left:5px;"><img src="../../assets/images/logo.png"/></div>
	      <div style="float:left;margin:10px;font-size:18px;color:#F08733;">
	        餐饮后台管理系统
	      </div>
	      <div class="content-right">

	      	<i class="fa fa-user-o" aria-hidden="true" style="font-size:25px"></i>
	      	<span v-if="">
	      		{{ personalInfo.username}}
	      	</span>

			<el-dropdown>
			  <el-button type="text">
			    <i class="el-icon-caret-bottom el-icon--right"></i>
			  </el-button>
			  <el-dropdown-menu slot="dropdown">
			    <el-dropdown-item  ><span  @click="dialogVisible = true">切换主题</span></el-dropdown-item>
			    <el-dropdown-item  ><span @click="editlogin" >退出登录</span></el-dropdown-item>
			  </el-dropdown-menu>
			</el-dropdown>



	      	<!-- <el-button type="text" @click="dialogVisible = true">切换主题</el-button>
	      	
	      	
	      	<el-button type="text" @click="editlogin">退出登录</el-button> -->
	      </div>
    	</div>
		<div class="content-wrapper">
		  <div class="nav">               
		       <el-row class="tac">
		        <el-col :span="26">
		            <el-menu default-active="2" class="el-menu-vertical-demo"  theme="dark" style="position:fixed;top:50px; bottom: 0px;left:0;right: 0;width:200px;">
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
			                 
			            <router-link to="/stock/stock">
		              		<el-menu-item index="6"><i class="el-icon-menu"></i>库存管理</el-menu-item>
		                </router-link>

		              	<router-link to="/Cost/index">
		              		<el-menu-item index="7"><i class="el-icon-date"></i>成本管理</el-menu-item>
		                </router-link>

		            </el-menu>
		          </el-col>
		      </el-row>
		    </div>
		 	<div class="right">
		 		<div class="crumbs">
		 			<lv></lv>
			 		
		 		</div>
		 		<router-view></router-view>
		 	</div>
		</div>


		<!-- 换肤弹窗 -->
		<el-dialog title="更改主题颜色" :visible.sync="dialogVisible" >
		      <el-form class="small-space" label-position="left" label-width="130px" style='width: 400px; margin-left:50px;'>		     
		        <el-form-item label="请选择主题颜色：" prop="resource">
		           <el-radio-group v-model="themeValue">
		                <el-radio label="blue">蓝色</el-radio>
		                <el-radio label="green">绿色</el-radio>
		                <el-radio label="orange">橙色</el-radio>
		           </el-radio-group>
		         </el-form-item>	       
		      </el-form>

		      <div slot="footer" class="dialog-footer">
		        <el-button @click="dialogVisible = false">取 消</el-button>		       
		        <el-button type="primary" @click="handleChangeTheme">确 定</el-button>
		      </div>
		</el-dialog>
	</div>
	
</template>
<script>
import store from '../../store/index';
import {global} from '../../global/global';
import lv from './levelbar.vue'
	export default {
		name: 'index',
		components:{
			lv
		},
		
		data() {
			return{
				personalInfo : store.state.user.userInfo,
				dialogVisible :false,//切换主题显示
				themeValue: localStorage.getItem("themeValue") ? localStorage.getItem("themeValue") : 'blue'
			}
		},

	    mounted:function(){
	      console.log( store.state.user.userInfo)
	     
	    } ,
	    methods:{
	    	editlogin:function(){
	    		this.$router.push({ path: '/' });
	    	},
	    	//换肤
	    	handleChangeTheme(){
	    	    var vm = this;
	    	    global.changeTheme(vm.themeValue);

	    	    this.dialogVisible = false;
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
	/* .nav{
	  position:fixed;
	  top:50px;
	  bottom: 10px;
	  left:0;
	  right: 0;
	  width:200px;
	} */
	  /* background-color: #324157; */


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