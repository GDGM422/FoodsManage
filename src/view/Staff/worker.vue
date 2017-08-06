<template>
	<div>
	  <div class="rs_btn">
	  <div class="rs_inp"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
	  	 <!-- 搜索框 -->
        <el-button class="rs_query">搜索</el-button>
		<el-button>批量删除</el-button>
	  </div>
	  
		<el-table
		    :data="tableData3.worker"  
		    border
		    style="width: 100%">
		    <el-table-column type="selection" width="60"> </el-table-column>
		    <el-table-column prop="rs_number" label="序号" width="100"></el-table-column>
		    <el-table-column prop="name" label="姓名" width="150"></el-table-column>
		    <el-table-column prop="rs_sex" label="性别" width="150" ></el-table-column>
		    <el-table-column prop="rs_id" label="工号" width="150" ></el-table-column>
		    <el-table-column prop="rs_post" label="职位" width="150" ></el-table-column>
		    <el-table-column prop="rs_limit" label="权限" width="150"></el-table-column>
		    <el-table-column label="操作">
	        <template scope="scope">
          	<!-- <router-link to="/staff_edit"></router-link> -->
            <el-button  size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button> 
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
	       </el-table-column>
		  </el-table>
		  <p>员工信息：{{s}}</p>
	</div>
</template>

<script>
  import store from '../../store/index';
	export default {
		name: 'worker',
	    data() {
	      return {
	        tableData3:{
	        	worker:[]  //引入json数据对象
	        },
	        input: '',//搜索框
	        s:store.state.staff.staffManagment
	      }

	   },
	   mounted:function(){   //生命周期
	   		this.getData();
	   		console.log( store.state.staff.staffManagment)
	   },
	    methods: {
         handleEdit(index, row) {  //编辑
           // var vm=this;
           // this.$router.push({path:'/staff_add'})
         },
         handleDelete(index, row) {  //单个删除
           //前端删除
           this.tableData3.splice(index,1)
         },
         getData:function(){
         	 let staff=this;
         	this.$http.get("../../static/dataJson/workerData.json").then(function(response){
           //当请求成功，将返回的数据赋值给列表
         	  staff.tableData3=response.data;
         	  console.log(staff.tableData3.worker)
         	  var arr=staff.s;
         	  for(let i=0;i<arr.length;i++){
         	  	staff.tableData3.worker.push(arr[i])
         	  }
         	  // store.dispatch("",staff.tableData3.worker)
	   			
         	  
         	},function(response){
         	  alter("抱歉，请求失败了 T_T ")
         	});
         },
       },
       computed:{
       	  // staffManagment(){
       	  	//将原本的状态渲染到页面
       	  	// return this.$store.state.staffManagment;
       	  	// this.tableData3.worker.push(this.$store.state.staffManagment)
       	  // }
       }
	  }
</script>
<style>
	/* .rs_tabTitle{
		padding: auto;
		text-align:center;
	} */
	.el-table th>.cell {
    text-align: center;
}

   .rs_btn{width:400px;
           margin-bottom: 10px;}
   .rs_inp{width:200px;
		   	float: left;
		   	margin-right:5px;}
    .rs_query{margin-right: 20px;}
</style>
