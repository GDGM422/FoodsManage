<template>
	<div id="shangping">            
    	<div class="sp-search">
			<div class="sp_input_name">
    			<el-input v-model="input" placeholder="菜品名称"></el-input>
    		</div>
    		<div class="sp_input_type">
    			<el-input v-model="input" placeholder="菜品类别"></el-input>
    		</div>
    		<div class="sp_btn_search">
    			<el-button type="primary" icon="search">搜索</el-button>
    		</div>
    		<div class="sp_btn_add">
    			<el-button type="primary" @click="dialogFormVisible=true">
    				<i class="el-icon-plus">添加</i>
    			</el-button>
    		</div>
  		</div> 
		
		<div class="sp_table">
			<el-table
			    ref="multipleTable" :data="tableData3.cp" border tooltip-effect="dark" style="width: 100%"
			    @selection-change="handleSelectionChange">
			    <el-table-column type="selection" width="55"></el-table-column>
			    <el-table-column prop="cp_num" label="菜品编号"></el-table-column>
				<el-table-column prop="cp_name" label="菜品名称"></el-table-column>
				<el-table-column prop="cp_type" label="菜品类别"></el-table-column>
				<el-table-column prop="cp_price" sortable label="菜品单价"></el-table-column>
			    <el-table-column label="操作">
			          <template scope="scope">
			            <el-button
			              size="small"
			              @click="handleEdit(scope.$index, scope.row)"
			              v-if="$index!=nowEditCol">编辑</el-button>
			            <el-button
			              size="small"
			              type="danger"
			              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			          </template>
			        </el-table-column>
			  </el-table>			  
		</div>

		<!-- 添加菜品 -->
		<el-dialog title="添加菜品" :visible.sync="dialogFormVisible">
		    <el-form :model="formCP">
		    	<el-form-item label="菜品编号" :label-width="formLabelWidth">
			      	<el-input v-model="formCP.cp_num" auto-complete="off" ></el-input>
			    </el-form-item>
			    <el-form-item label="菜品名称" :label-width="formLabelWidth">
			      	<el-input v-model="formCP.cp_name" auto-complete="off" ></el-input>
			    </el-form-item>
			    <el-form-item label="菜品类别" :label-width="formLabelWidth">
			      	<el-input v-model="formCP.cp_type" auto-complete="off" ></el-input>
			    </el-form-item>
			    <el-form-item label="菜品单价" :label-width="formLabelWidth">
			      	<el-input v-model="formCP.cp_price" auto-complete="off" ></el-input>
			    </el-form-item>		    
		  	</el-form>
		    <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addCP" :loading="addLoading">确 定</el-button>
		  </div>
		</el-dialog>

		

	</div>
</template>

<script>
	export default {
	    data() {
	    	return {
	      		input: '',
	      		nowEditCol:-1,//当前编辑的行 
	      		isActive: false,
            	selected: -1, 
		      	tableData3:{
		      		cp:[]   //调用json数据
		      	},
		      	multipleSelection: [],
		            dialogFormVisible: false, //添加对话框的显示状态
		            addLoading: false,
		            editLoading:false,
		            formCP: {	
		            	cp_num:'',	
		                cp_name: '',
		                cp_type: '',
		                cp_price: ''
		            },
		            formLabelWidth: '80px',
		            
	    	}
	  	},
	  	mounted:function(){
	  		this.getData();
	  	},
	  	methods: {
	        handleSelectionChange(val) {
	          this.multipleSelection = val;
	        },
	        handleEdit(index, row) {
	          console.log(index, row);
	        },
	        handleDelete(index, row) {
	          console.log(index, row);
	        },
	        getData:function(){
	            let _this=this;
	            this.$http.get('../../static/dataJson/cp.json').then(function(response){
	                _this.tableData3=response.data;
	            },function(response){
	            	alert("出现错误！")
	            });
	        },
	        //添加事件
	        addCP(){
	        	let this_add=this;
	        	this_add.tableData3.cp.push(this_add.formCP);
	        	this_add.dialogFormVisible=false
	        },
	        //删除事件
	        handleDelete($index){
	        	let this_del=this;
	        	this_del.tableData3.cp.splice($index,1);
	        },
	        //编辑事件
	        /*editCP(){
	        	let this_edit=this;
	        	this_edit.formCP=this_edit.tableData3.cp[$index];
	        }*/
	        


	    }
	}
</script>

