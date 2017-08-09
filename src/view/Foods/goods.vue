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
			    <el-table-column type="selection" width="55" header-align="center"></el-table-column>
			    <el-table-column prop="cp_num" label="菜品编号" header-align="center"></el-table-column>
				<el-table-column prop="cp_name" label="菜品名称" header-align="center"></el-table-column>
				<el-table-column prop="cp_type" label="菜品类别" header-align="center"></el-table-column>
				<el-table-column prop="cp_price" sortable label="菜品单价" header-align="center"></el-table-column>
			    <el-table-column label="操作" header-align="center">
			          <template scope="scope">
			            <el-button
			              size="small"
			              @click="handleEdit(scope.$index, scope.row)" >编辑</el-button>
			            <el-button
			              size="small"
			              type="danger"
			              @click="handleDelete(scope.$index, scope.row)">删除</el-button>
			          </template>
			        </el-table-column>
			  </el-table>			  
		</div>

		<!-- 添加菜品 -->
		<el-dialog title="添加菜品" :visible.sync="dialogFormVisible" size="622px">
		    <el-form :model="formAdd" label-width="85px">
		    	<el-form-item label="菜品编号" :label-width="formLabelWidth">
			      	<el-input v-model="formAdd.cp_num" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品名称" :label-width="formLabelWidth">
			      	<el-input v-model="formAdd.cp_name" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品类别" :label-width="formLabelWidth">
			      	<el-input v-model="formAdd.cp_type" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品单价" :label-width="formLabelWidth">
			      	<el-input v-model="formAdd.cp_price" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>		    
		  	</el-form>
		    <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible = false">取 消</el-button>
			    <el-button type="primary" @click="addCP" :loading="addLoading">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 编辑菜品 -->
		<el-dialog title="编辑菜品" :visible.sync="dialogEditVisible" size="622px">
		    <el-form :model="formEdit" label-width="85px">
		    	<el-form-item label="菜品编号" :label-width="formLabelWidth">
			      	<el-input v-model="formEdit.cp_num" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品名称" :label-width="formLabelWidth">
			      	<el-input v-model="formEdit.cp_name" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品类别" :label-width="formLabelWidth">
			      	<el-input v-model="formEdit.cp_type" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>
			    <el-form-item label="菜品单价" :label-width="formLabelWidth">
			      	<el-input v-model="formEdit.cp_price" auto-complete="off" style="width: 220px"></el-input>
			    </el-form-item>		    
		  	</el-form>
		    <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogEditVisible = false">取 消</el-button>
			    <el-button type="primary" @click="editCP" :loading="addLoading">确 定</el-button>
		  </div>
		</el-dialog>
		

	</div>
</template>

<script>
import store from '../../store/index'
import { api } from '../../global/api'
	export default {
	    data() {
	    	return {
	      		input: '',
		      	tableData3:{
		      		cp:[]   //调用json数据
		      	},
		      	multipleSelection: [],
		            dialogFormVisible: false, //添加对话框的显示状态
		            addLoading: false,
		            dialogEditVisible:false,
		            editLoading:false,
		            editSelected:-1,
		            formAdd: {	
		            	cp_num:'',	
		                cp_name: '',
		                cp_type: '',
		                cp_price: ''
		            },
		            formEdit: {	
		            	cp_num:'',	
		                cp_name: '',
		                cp_type: '',
		                cp_price: ''
		            },
		            formLabelWidth: '80px',
		        	xiugailist:store.state.goods.goodslist
		            
	    	}
	  	},
	  	mounted:function(){
	  		this.getData();
	  		
	  	},
	  	methods: {
	        getData:function(){
	            let _this=this;
	            this.$http.get(api.cp).then(function(response){
	                _this.tableData3=response.data;
	                this.tableData3.cp=this.xiugailist
	                // store.dispatch('setGoods',_this.tableData3);
	            },function(response){
	            	alert("出现错误！")
	            });
	        },
	        addCP(){
	        	let this_add=this;
	        	this_add.tableData3.cp.push(this_add.formAdd);
	        	this_add.dialogFormVisible=false;
	        	store.dispatch('setGoods',this_add.tableData3.cp);

	        },
	        handleDelete($index){
	        	let this_del=this;
	        	this_del.tableData3.cp.splice($index,1);
	        	store.dispatch('setGoods',this_del.tableData3.cp);
	        },
	        handleEdit($index){
	        	let this_edit=this;
	        	this_edit.dialogEditVisible=true;//弹框是否显示
	        	console.log('弹框显示', this_edit.dialogEditVisible)	

	        	this_edit.editSelected=$index;//修改数据的位置
	        	console.log('修改数据的位置',this_edit.editSelected)

	        	this_edit.formEdit=JSON.parse(JSON.stringify(this_edit.tableData3.cp[$index]));//传值
	        	console.log('this_edit.formEdit',this_edit.formEdit);
	        	  	    	
	        },
	        editCP(){
	        	let this_edit=this;
	        	//数据保存到index位置上
	        	// this_edit.tableData3.cp.$set(this_edit.tableData3.cp,this_edit.editSelected,this_edit.formEdit);//data,key,value
	        	this_edit.tableData3.cp.splice(this_edit.editSelected, 1, this_edit.formEdit)
	        	this_edit.dialogEditVisible = false;
	        	store.dispatch('setGoods',this_edit.tableData3.cp);
	        }
	        	
	        
	    }
	}
</script>

