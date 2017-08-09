<template>
	<div>
	  <div class="rs_btn">
	  <div class="rs_inp"><el-input v-model="input" placeholder="请输入内容"></el-input></div>
	  	 <!-- 搜索框 -->
        <el-button type="primary" icon="search">搜索</el-button>
		<el-button type="primary" icon="delete" @click="handleMutiDel">批量删除</el-button>
	  </div>
	  
		<el-table
		    :data="tableData3.worker"  
		    border
		    highlight-current-row
		    style="width: 100%">
		    <el-table-column type="selection" header-align="center" width="60" > </el-table-column>
		    <!-- <el-table-column prop="rs_number" label="序号" width="100"></el-table-column> -->
		    <el-table-column type="index"header-align="center" label="序号" width="70"></el-table-column>  <!-- 自增 -->
		    <el-table-column label="姓名" header-align="center" >
		    	<template scope="scope">{{scope.row.rs_name}}</template>
		    </el-table-column>
		    <el-table-column prop="rs_sex" label="性别" header-align="center">
		    	<template scope="scope">{{scope.row.rs_sex}}</template>
		    </el-table-column>
		    <el-table-column prop="rs_id" label="工号" header-align="center">
		    	<template scope="scope">{{scope.row.rs_id}}</template>
		    </el-table-column>
		    <el-table-column prop="rs_post" label="职位" header-align="center">
		    	<template scope="scope">{{scope.row.rs_post}}</template>
		    </el-table-column>
		    <el-table-column prop="rs_limit" label="权限" header-align="center">
		    	<template scope="scope">{{scope.row.rs_limit}}</template>
		    </el-table-column>
		    <el-table-column label="月薪" header-align="center">
		    	<template scope="scope">{{scope.row.rs_price}}</template>
		    </el-table-column>
		    <el-table-column prop="rs_desc" header-align="center" label="备注" width="180">
		    	<template scope="scope">{{scope.row.rs_desc}}</template>
		    </el-table-column>
		    <el-table-column label="操作" header-align="center" width="180" >
	        <template scope="scope">
          	<!-- <router-link to="/staff_edit"></router-link> -->
            <el-button  size="small" @click="handleEdit(scope.$index, scope.row)" class="rs_query" type="primary" icon="edit">编辑</el-button> 
            <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)" icon="delete">删除</el-button>
            </template>
	       </el-table-column>
		</el-table>

			<!-- 编辑弹出框 -->
		 <el-dialog title="修改员工信息" :visible.sync="dialogFormVisible" size="tiny">
		   <el-form v-model="form" class="rs_dialogbody">
		      <el-form-item label="姓名" :label-width="formLabelWidth">
		         <el-input v-model="form.rs_name" auto-complete="off"></el-input>
		      </el-form-item>
			  <el-form-item label="性别" :label-width="formLabelWidth"> 
			     <el-radio-group v-model="form.rs_sex">
			        <el-radio label="男"></el-radio>
			        <el-radio label="女"></el-radio>
			     </el-radio-group>
			  </el-form-item>
			  <el-form-item label="工号" :label-width="formLabelWidth">
				  <el-input v-model="form.rs_id"></el-input>
			  </el-form-item>
		      <el-form-item label="职位" :label-width="formLabelWidth">
		        <el-select v-model="form.rs_post" placeholder="请选择职位">
		           <el-option label="经理" value="经理"></el-option>
	         	        <el-option label="店长" value="店长"></el-option>
	         	        <el-option label="收银员" value="收银员"></el-option>
	         	        <el-option label="服务员" value="服务员"></el-option>
	         	        <el-option label="保洁员" value="保洁员"></el-option>
		        </el-select>
		      </el-form-item>
		       <el-form-item label="权限" :label-width="formLabelWidth">
		        <el-select v-model="form.rs_limit" placeholder="请选择权限" >
		          <el-option label="高级" value="高级"></el-option>
		          <el-option label="中级" value="中级"></el-option>
		          <el-option label="初级" value="初级"></el-option>
		        </el-select>
		      </el-form-item>
		       <el-form-item label="月薪" :label-width="formLabelWidth">
		          <el-input v-model="form.rs_price" auto-complete="off"></el-input>
		      </el-form-item>
		      <el-form-item label="备注" :label-width="formLabelWidth">
		        <el-input type="textarea" v-model="form.rs_desc"></el-input>
		      </el-form-item>
		    </el-form>
		    
		   <div slot="footer" class="rs_dialogfooter">
		     <el-button @click="dialogFormVisible = false">取 消</el-button>
		     <el-button type="primary" @click="ediSure">确 定</el-button>
		   </div>
		 </el-dialog>
		
		  <!-- <p>员工信息：{{s}}</p> -->
	</div>
</template>

<script>
  import store from '../../store/index';
  import { api } from '../../global/api'
	export default {
	    data() {
	    	
	      return {
	        tableData3:{
	        	worker:[]  //引入json数据对象
	        },
	        input: '',//搜索框
	        s:store.state.staff.staffManagment,
	        dialogFormVisible: false,
	        form: {
	                 rs_name: "", 
         		     rs_sex: "",
         		     rs_id:"", 
         		     rs_post:"",
         		     rs_price:"",
         		     rs_limit:"",
         		     rs_desc:""
	               },
	         formLabelWidth: '50px',
	         index0:null,
	        }

	   },
	    mounted:function(){   //生命周期
	   		this.getData();
	   		console.log("生命周期：",store.state.staff.staffManagment)
	   },
	    methods: {
	    
         //编辑
         handleEdit(index, row){
         	this.dialogFormVisible = true;
         	//JSON.parse(JSON.stringify(row))  深度拷贝
         	//相同组件中的实例会共享同一个data对象，所以当编辑还未确定时表格数据就已同步，所以要通过深层拷贝来区分两个实例
         	this.form=JSON.parse(JSON.stringify(row));  //将当前行的值放入弹出框
         	console.log(this.form);
         	this.index0=index;
         },
         ediSure(){
         	// this.tableData3.worker.splice(this.index0,1,this.form);
         	console.log(">>>>>"+this.form);
         	console.log(this.tableData3.worker);
         	store.dispatch('commitCost',this.tableData3.worker);//将数据传出去

         	//编辑校验
             var arr0=[];
         	 var ediLen=this.tableData3.worker.length;
         	 for(let i=0;i<ediLen;i++){
         	 	arr0.push(this.tableData3.worker[i].rs_id) ;
         	 }
         	 arr0.splice(this.index0,1)//在所有的工号里删掉当前这个
         	 var a=this.form.rs_id;    //填入的工号
         	 if(arr0.indexOf(a)==-1){
         	 	 this.tableData3.worker.splice(this.index0,1,this.form);
         	 	 this.dialogFormVisible = false;
         	}else{
         	 	 alert("工号已存在");
         	 	 this.dialogFormVisible = false;
         	}
         },
         handleDelete(index, row) {  //单个删除
         	var rs_sure=this;
           //前端删除
            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {  //弹出确认框
                 confirmButtonText: '确定',
                 cancelButtonText: '取消',
                 type: 'warning'
                 }).then(() => {
                 type: 'success'
              	 rs_sure.tableData3.worker.splice(index,1);
              	 store.dispatch('commitCost',this.tableData3.worker);
                 }).catch(() => {
                 this.$message({
                 type: 'info',
                 message: '已取消删除'
                 });          
                 });
         },
         handleMutiDel(){
         	 var delLen=this.tableData3.worker.length;
         	 for(var q=0;q<delLen;q++){
         		this.worker.rs_id
         	}
         	console.log(this.tableData3.worker[q].rs_id)
         },
           
         getData:function(){  //请求json
            let staff=this;
         	this.$http.get(api.workerData).then(function(response){
            //当请求成功，将返回的数据赋值给列表
         	 staff.tableData3=response.data;//让请求回来的json数据赋值到表格tableData3
         	 var arr=staff.s;  //每新增一条数据，arr的长度就会加一

         	 console.log("arr>>>>>>>>",staff)
         	 
         	 //校验新增的工号唯一
         	 var idarr=[];
         	 var l=staff.tableData3.worker.length;
         	 for(let i=0;i<l;i++){
         	    idarr.push(staff.tableData3.worker[i].rs_id)  //将表格中的所有ID放进一个数组
         	}
         	   console.log("111111111111",idarr)
         	   console.log("length>>>>",arr.length)
         	for(var j=0;j<arr.length;j++){
         	 	var add0=arr[j].rs_id   					  //取到输入的工号
				console.log("000000002",add0)

         	if(idarr.indexOf(add0)==-1){  				//indexOf():某个指定的字符串在字符串中首次出现的位置
         	 	 staff.tableData3.worker.push(arr[j])
            }else{
            	 console.log(add0)
         	 	 alert("该工号已存在！！")
         	 	 break;
          	}     
 
   		}

         	 },function(response){
         	  alter("抱歉，请求失败了 T_T ")
         	});
          }
       },
         computed:{
       	  
       }
	  }
</script>
<style>
	
	    .rs_btn{width:100%; margin-bottom: 10px; text-align: left;}
	    .rs_inp{width:300px;float:left;margin-right:5px;}
	    .rs_dialogbody{text-align:left;margin-bottom:-30px;}
	    .rs_dialogfooter{text-align: center}
	   
</style>
