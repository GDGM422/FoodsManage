<template>
	<div id="login">
   
     
    
     
		<div class="login">
      <h2>餐饮后台管理系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" v-loading.fullscreen.lock="fullscreenLoading">
          
          <el-form-item label="用户名" prop="username" >
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
         
          <el-form-item label="密码" prop="pass"  style="color:#fff;">
            <el-input type="password" v-model="ruleForm.pass" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

      </el-form>
      <br>
      <div>用户信息:{{ personalInfo }}</div>
      <div>测试帐号为:admin 密码：123456</div>
		</div>
	</div>
	
</template>

<script>
  import Vue from 'vue'
  import store from '../store/index';
	export default {
    data() {
      var validatePass = (rule, value, callback) => {
        console.log(this)
        if (value === '') {
          callback(new Error('请输入密码'));
        } else {
          
          if(value==='123456'){
            callback();
          } 
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if(value==='admin'){  
            callback();   
          }
        }
      };
      return {
       
        ruleForm: {
          username:store.state.user.userInfo.username ,
          pass: ''
        },
        fullscreenLoading: false,
        personalInfo:store.state.user.userInfo,
        rules: {
          username: [
            { required: true,validator: validateUsername , trigger: 'blur' },
            
          ],
          pass:[
            { required:true,validator: validatePass,trigger:'blur' }
          ]
        }
      };
    },  
    methods: {
      submitForm(formName) {
        this.$refs[formName].validate((valid) => {
          this.fullscreenLoading = true;
                
          if (valid) {
            var  par = JSON.parse(JSON.stringify(this.ruleForm)) ;
                console.log('登陆成功即将跳转--------')
                store.dispatch('setUserInfo',par);//vuex传参数据
                // if(window.localStorage){
                //   localStorage.setItem('user','par');
                // }
                setTimeout(() => {
                  this.fullscreenLoading = false;
                  this.$router.push({ path: '/index/readme' });
                }, 3000);
          } else {
            // this.$message.error('登录失败!用户名或密码错误!');
            console.log('登录失败!用户名或密码错误!!');
            return false;
          }
        });
      },
      resetForm(formName) {
        this.$refs[formName].resetFields();
      } 
    },
    mounted:function(){
      console.log( store.state.user.userInfo)
    }        
    
  }
</script>
<style>
 #login{
    position: fixed;  
    background: url('../assets/images/sky.jpg');
    background-size: 100% 110%;
    width: 100%;
    height: 100%;  
    margin: 0px;
    padding: 0px;
  }
	.login{
    position: relative;
    width: 400px;
    height: 230px;
    left: 50%;
    top: 25%;
    margin-left: -200px;
    border-radius: 6px;
    background:#1d2f47;
    padding-right: 50px;
    padding-top: 20px;	
	}
  h2{
    font-size: 1.5em;
    padding-bottom: 20px;
    font-family: "宋体";
    padding-left: 50px;
    color:#fff;
  }
 
  
   
</style>