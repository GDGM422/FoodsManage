<template>
<div id="message">
	<el-col class="qx" >
		<p class="title">你的权限</p>
		<hr>
		<p class="name">{{ roles.username }}</p>
	</el-col>

	<el-row>
		<el-col class="info">
			<p class="title">个人信息</p>
			<hr>
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
					<el-button @click="editable = true" style="text-align: center;" icon="edit">编辑</el-button>   
				</el-form>
			</div>
		</el-col>
	</el-row>
</div>
</template>

<script>
	import Vue from 'vue'
	import store from '../../store/index';

	export default {
		name: 'message',
		data() {
			return{
				// personalInfo : store.state.person.personInfo,
				editable:false,
				personalInfo:{},
				roles: store.state.user.userInfo
			}
		},

		mounted: function(){
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
		},

		// watch: {
		//   role(val) {
		//     this.$store.dispatch('ChangeRole', val).then(() => {
		//       this.$router.push({ path: '/permission/index?' + +new Date() });
		//     })
		//   }
		// }
	}
</script>

<style scope>
	.qx{
		width: 30%;
		margin: 5%;
		padding: 20px;
		text-align: center;
		border: 1px solid #324157;
		border-radius: 6px;
	}
	.qx .name{
		font-size: 32px;
		color: #8b5d30;
		margin-top: 12px;
	}
	.info{
		width: 50%;
		padding: 20px 32px;
		text-align: center;
		border: 1px solid #324157;
		border-radius: 6px;     
	}
	.title{
		font-size: 32px;
		color: #324157;
		margin-bottom: 12px;
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