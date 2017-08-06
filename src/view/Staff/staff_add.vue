<template>
	<div class="rs_bor">
	<p>新增员工</p>
	<el-form ref="form" :model="form" label-width="50px" style="text-align:left">
	  <el-form-item label="姓名">
	    <el-input v-model="form.rs_name"></el-input>
	  </el-form-item>
	   <el-form-item label="性别">
	    <el-radio-group v-model="form.rs_sex">
	      <el-radio label="男"></el-radio>
	      <el-radio label="女"></el-radio>
	    </el-radio-group>
	  </el-form-item>
	  <el-form-item label="工号">
	    <el-input v-model="form.rs_id"></el-input>
	  </el-form-item>
	  <el-form-item label="职位">
	    <el-select v-model="form.rs_post" placeholder="请选择职位">
	      <el-option label="经理" value="经理"></el-option>
	      <el-option label="店长" value="店长"></el-option>
	      <el-option label="收银员" value="收银员"></el-option>
	      <el-option label="服务员" value="服务员"></el-option>
	      <el-option label="保洁员" value="保洁员"></el-option>
	    </el-select>
	  </el-form-item>
	   <el-form-item label="权限">
	    <el-select v-model="form.rs_limit" placeholder="请选择权限">
	      <el-option label="高级" value="高级"></el-option>
	      <el-option label="中级" value="中级"></el-option>
	      <el-option label="初级" value="初级"></el-option>
	    </el-select>
	  </el-form-item>
	  <el-form-item label="备注">
	    <el-input type="textarea" v-model="form.rs_desc"></el-input>
	  </el-form-item>

	  <el-form-item>
	    <el-button type="primary" @click="onSubmit">立即创建</el-button>
	    <el-button>取消</el-button>
	  </el-form-item>
	</el-form>
	</div>
</template>
<script>
  import store from '../../store/index';
     export default {
	    data() {
	      return {
	      	add:[],
	        form: { 
		     rs_name: "", 
		     rs_sex: "",
		     rs_id:"", 
		     rs_post:"",
		     rs_limit:"",
		     rs_desc:""
	        }
	      }
	    },
	    methods: {
	      onSubmit() {
	      	var s=JSON.parse(JSON.stringify(this.form));
	        this.add.push(s);
	        store.dispatch('setstaff',this.add);//分发action
	        store.dispatch('commitCost',this.add);
	        this.$router.push({path:'/renshi/worker'})
	      }
	    }
	 }
</script>

<style>
	.rs_bor{border: 1px solid #002e5b;
	        border-radius: 8px;
	        width:400px;
	        padding:20px;
	        margin: auto;
	    }
	  .el-button--primary {
   		  margin-left: 70px;
   }
   p{
   	font-size: 20px;
   	font-weight:bold;
   	margin-bottom:20px;
   }
</style>