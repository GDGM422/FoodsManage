<template>
	<div id="message">
		<el-row :gutter="20">
			<el-col :span="12">
                <div class="user_info">
                	<h2>个人信息
                	<el-button size="small" v-if="!editable" @click="editable = true" style="float:right;" icon="edit">编辑</el-button> </h2> 
                    
                    <div class="user_info_form" v-if="editable">
                        <el-form label-position="right" label-width="100px" :model="personalInfo">
                              <el-form-item label="昵称:">
                                <el-input v-model="personalInfo.username"></el-input>
                              </el-form-item>
                              <el-form-item label="真实姓名:">
                                <el-input v-model="personalInfo.trueName"></el-input>
                              </el-form-item>
                              <el-form-item label="性别:">
                                    <el-radio-group v-model="personalInfo.sex">
                                          <el-radio label="man">男</el-radio>
                                          <el-radio label="woman">女</el-radio>
                                    </el-radio-group>
                              </el-form-item>
                              <el-form-item label="职位：">
                                <el-input v-model="personalInfo.job"></el-input>
									
                              </el-form-item>
                              <el-form-item label="邮件地址:" >
                                <el-input v-model="personalInfo.email" disabled=""></el-input>
                              </el-form-item>
                              <el-form-item label="个人简介:">
                                <el-input type="textarea" v-model="personalInfo.introduction"></el-input>
                              </el-form-item>

                              <el-form-item>
                                	<el-button type="primary" @click="submitPersonForm">提交</el-button>
                                	<el-button @click="resetPersonForm" >取消</el-button>
                               </el-form-item>

                        </el-form>

                    </div>
                    <div class="user_info_text" v-else>
                        <el-form label-position="right" label-width="100px" :model="personalInfo">

                              <el-form-item label="昵称：">
                                <span class="person_font"> {{ personalInfo.username }}  </span>
                              </el-form-item>

                              <el-form-item label="真实姓名：">
                                <span class="person_font">{{ personalInfo.trueName }}</span>
                              </el-form-item>

                              <el-form-item label="性别：">
                              	<span class="person_font">
	                                <span v-if="personalInfo.sex == 'man'">男</span>
	                                <span v-else>女</span>
                                </span>
                              </el-form-item>

                              <el-form-item label="职位：">
									<span class="person_font"> {{ personalInfo.job }}</span>
                              </el-form-item>

                              <el-form-item label="邮件地址：">
                                <span class="person_font">{{ personalInfo.email }}</span>
                              </el-form-item>

                              <el-form-item label="个人简介：">
                                <span class="person_font">{{ personalInfo.introduction }}</span>
                              </el-form-item>    
                        </el-form>
                    </div>
                </div>

            </el-col>
        </el-row>

	</div>
</template>

<script>
import Vue from 'vue'
import store from '../../store/index';
export default {
	
	data() {
		return{
			// personalInfo : store.state.person.personInfo,
        	editable:false,
        	personalInfo:{}
		}
	},

    mounted:function(){
        this.resetPersonForm();
      	console.log( store.state.user.userInfo)
      // console.log(localStorage.getItem('user'))
    },

    methods:{
    	//提交表单
    	submitPersonForm:function() {
    		this.editable=false;
    		var params=JSON.parse(JSON.stringify(this.personalInfo));
    		store.dispatch('setPersonInfo',params)
    		cosnole.log('修改信息入参为：',params)

    	}, 

    	// 重置表单
    	resetPersonForm:function(){
    		this.editable=false;
    		this.personalInfo=JSON.parse(JSON.stringify(store.state.person.personInfo))
    	}
    }
}
</script>

<style>
	.user_info{
        padding-bottom: 20px;
        border: 1px solid #dee1e2;     
    }
    .user_info h2{
        margin: 0;
    	font-weight: normal;
    	padding: 10px 20px;
    	border-bottom: 1px solid #dee1e2;
        font-size: 22px;   
    }
    .i_edit{
	    float: right;
	    font-size: 16px;
	    color: #7ab8ed;
    }
    .user_info_form,.user_info_text{
        padding: 20px;
    }
    .person_font{
    	float: left;

    }
</style>