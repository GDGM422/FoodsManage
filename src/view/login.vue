<template>
	<div id="login">    
		<div class="login" >
      <h2>餐饮后台管理系统</h2>
      <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm" >
          
          <el-form-item label="用户名" prop="username">
            <el-input v-model="ruleForm.username"></el-input>
          </el-form-item>
         
          <el-form-item label="密码" prop="pass">
            <el-input type="password" v-model="ruleForm.pass" @keyup.enter.native="submitForm('ruleForm')"></el-input>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')" v-loading.fullscreen.lock="fullscreenLoading">登录</el-button>
              <el-button @click="resetForm('ruleForm')">重置</el-button>
          </el-form-item>

      </el-form>
      <br>
      
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
          }else{
            callback(new Error('密码错误!'));
          } 
        }
      };
      var validateUsername = (rule, value, callback) => {
        if (value === '') {
          callback(new Error('请输入用户名'));
        } else {
          if(value==='admin'){  
            callback();   
          }else{
            callback(new Error('用户名错误!'));
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
              //vuex传参数据
              store.dispatch('setUserInfo',par).then(() => {
                    console.log('登陆成功即将跳转--------')
                    // this.$router.push({ path: '/' });
                   if(this.ruleForm.username!=''&&this.ruleForm.pass!=''){
                      setTimeout(() => {
                        this.fullscreenLoading = false;
                        this.$router.push({ path: '/index/readme' });
                      }, 1000);
                    }
                  }).catch(err => {
                    this.$message.error(err);     
              });                          
            } else {
              // this.$message.error('登录失败!用户名或密码错误!');
              this.fullscreenLoading = false;
              this.$message.error('登录失败!用户名或密码错误!!');
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
<style scope>
	.login{
    position: relative;
    width: 400px;
    height: 250px;
    left: 50%;
    top: 25%;
    margin-left: -200px;
    border-radius: 6px;
    background:#1d2f47;
    padding-right: 50px;
    padding-top: 6px;	
	}
  h2{
    font-size: 1.5em;
    padding-bottom: 6px;
    font-family: "宋体";
    padding-left: 50px;
    color:#fff;
  }
 
   
</style>