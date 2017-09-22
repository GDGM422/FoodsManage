<template>
<div v-cloak>
    <h2 style="color:red">
        注意：此页面使用了本地api接口，若想正常运行，请下载另外一个node项目（https://github.com/lss5270/vue-admin-spa-api），并且在本地启动该node项目。
    </h2>
    
    <el-form :model="ruleForm" :rules="rules" ref="ruleForm" label-width="100px" class="demo-ruleForm">
      
      <el-form-item label="图书名称" prop="bookName">
            <el-col :span="11" >
                <el-input v-model="ruleForm.bookName"></el-input>
            </el-col>
      </el-form-item>

      <el-form-item label="图书类别" prop="bookType">
            <el-col :span="11" >
                <el-select v-model="ruleForm.bookType" placeholder="类别"  >
                  <el-option label="青春文学 " value="Youth"></el-option>
                  <el-option label="科普读物 " value="Science"></el-option>
                  <el-option label="生活 " value="Life"></el-option>
                  <el-option label="杂志 " value="Magazine"></el-option>
                </el-select>
             </el-col>
      </el-form-item>

      <el-form-item label="图书作者" prop="bookAuthor">
           <el-col :span="11" >
                <el-input v-model="ruleForm.bookAuthor"></el-input>
            </el-col>
      </el-form-item>

      <el-form-item label="出版社名称" prop="pressName">
            <el-col :span="11" >
                <el-input v-model="ruleForm.pressName"></el-input>
             </el-col>
      </el-form-item>

      <el-form-item label="出版日期" required> 
        <el-col :span="5" >
          <el-form-item prop="publicDate" >
            <el-date-picker type="date" placeholder="选择出版日期" v-model="ruleForm.publicDate" style="width: 100%;"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="submitForm('ruleForm')">立即修改</el-button>
        <el-button @click="resetForm('ruleForm')">重置</el-button>
      </el-form-item>
    </el-form>
</div>
</template>
<script>
    import { Message } from 'element-ui';
    import { api } from '../../global/api'

    export default {
        data() {
          return {
            ruleForm: {
              bookName: '',        //图书名称
              bookType:'',              //图书类别
              bookAuthor: '',
              pressName: '',
              publicDate: '',
            },
            rules: {
              bookName: [
                { required: true, message: '请输入图书名称', trigger: 'blur' },
                { min: 2, max: 8, message: '长度在 2 到 8 个字符', trigger: 'blur' }
              ],
              bookAuthor:[
                { required: true, message: '请输入图书作者', trigger: 'blur' },
                { min: 2, max: 10, message: '长度在 2 到 10 个字符', trigger: 'blur' }
              ]
            }
          };
        },
        mounted() {
        },
        methods: {
            submitForm(formName) {
              let that = this;
              this.$refs[formName].validate((valid) => {
                if (valid) {
                      console.log('修改图书信息提交入参：',this.ruleForm);
                      this.$http.post('http://localhost:3000/api/modifyStudents',this.ruleForm,null,function(res){             
                          //正式编程以下代码请放到接口成功回调函数中
                          Message({
                              showClose: true,
                              message: '修改图书信息,提交成功，正在跳转页面……',
                              type: 'success'
                          })
                          setTimeout(()=>{
                              that.$router.push('/booksManage/booksList')
                          },2000)
                      },function(res){
                          alert('修改数据失败，接口返回的数据为：',res)
                          
                      })
                      
                } else {
                  console.log('error submit!!');
                  return false;
                }
              });
            },
            resetForm(formName) {
              this.$refs[formName].resetFields();
            }
        }
      }
</script>

<style scoped>
[v-cloak] {
  display: none;
}
.component-item{
  margin-top: 100px;
}
.code-part{
  margin-top: 20px;
}
</style>
