<template>

	<div class="stock_wrap">
		<!-- 按货物名称查询 -->
		<div class="stock_top">
			<el-input placeholder="按货物名称查询" icon="search" v-model="input_stock_name" :on-icon-click="handleIconClick" class="search_stock">
			</el-input>
			<el-button type="primary"  @click="dialogFormVisible = true">添加库存记录</el-button>
		</div>	

		<div class="stock_content">
			<el-table
			    ref="multipleTable"
			    class="tb-edit"
			    :data="stockData1.stockData"
			    border
			    tooltip-effect="dark"
			    style="width: 100%"
			     :default-sort = "{prop: 'operatingTime', order: 'descending',prop: 'stockNum',order:'ascending'}"
			      highlight-current-row>
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="库存编号"
			      sortable prop="stockNum"
			      width="120"
			      header-align="center"
			      >
			      <template scope="scope">{{ scope.row.stockNum }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="stockType"
			      label="类型"
			      sortable
			      width="120"
			      header-align="center">
			      <template scope="scope">
			       <el-input size="small" v-model="scope.row.stockType" placeholder="请输入内容"></el-input>
			      <span>{{ scope.row.stockType }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="stockName"
			      label="货物名称"
			      width="120"
			      header-align="center">
			      <template scope="scope">
			       <el-input size="small" v-model="scope.row.stockName" placeholder="请输入内容"></el-input>
			      <span>{{ scope.row.stockName }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="Poh"
			      label="现有库存量"
			      width="120"
			      header-align="center">
			      <template scope="scope">
			      <el-input size="small" v-model="scope.row.Poh" placeholder="请输入内容"></el-input>
			      <span>{{ scope.row.Poh }}</span>
			      </template>
			    </el-table-column>
				<el-table-column
			      prop="unit"
			      label="单位"
			      width="120"
			      header-align="center">
			      <template scope="scope">
			      <el-input size="small" v-model="scope.row.Poh" placeholder="请输入内容"></el-input>
			      
			      <span>{{ scope.row.unit }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作时间"
			      show-overflow-tooltip
			      sortable prop="operatingTime"
			      header-align="center">
			        <template scope="scope">
			        <el-input size="small" v-model="scope.row.operatingTime" placeholder="请输入内容"></el-input>	        			
	        		<span style="margin-left: 10px"><el-icon name="time"></el-icon>{{ scope.row.operatingTime }}</span>
	        	    </template>
			    </el-table-column>
			    <el-table-column
			      prop="operator"
			      label="操作人"		      
			      width="120"
			      header-align="center">
			      <template scope="scope">
			      <el-input size="small" v-model="scope.row.operator" placeholder="请输入内容"></el-input>
			      <span>{{ scope.row.operator }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column		      
			      label="操作"		      
			      show-overflow-tooltip
			      header-align="center">
			      <template scope="scope">			      
	        		<el-button size="small" @row-click="handleCurrentChange">编辑</el-button>        
	        		<el-button size="small" @change="handleEdit(scope.$index, scope.row)">提交</el-button> 		
	        	  </template>
			    </el-table-column>
			</el-table>
		
		</div>	
		<!-- 添加库存记录弹出框 -->
		<el-dialog title="添加库存记录" :visible.sync="dialogFormVisible">
		  <el-form :model="form">
		    <el-form-item label="库存编号">
		      <el-input v-model="form.stockNum" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="类型">
		      <el-input v-model="form.stockType" auto-complete="off" ></el-input>
		    </el-form-item>
		    <el-form-item label="货物名称">
		      <el-input v-model="form.stockName" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="现有库存量">
		      <el-input v-model="form.Poh" auto-complete="off"></el-input>
		    </el-form-item>
		    <el-form-item label="单位">
		      <el-input v-model="form.unit" auto-complete="off"></el-input>
		    </el-form-item>
		     <el-form-item label="操作时间">
		      <el-input v-model="form.operatingTime" auto-complete="off"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="AddStockData">确定添加</el-button>
		  </div>
		</el-dialog>
	</div>		
</template>

<style>
.stock_top {
	margin: 10px;
}
.search_stock{
	width: 180px;
}

/* //暂时性解决diolag 问题 https://github.com/ElemeFE/element/issues/2461 */
.el-dialog {
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
}
.tb-edit .el-input  {
    display: none
}

.tb-edit .current-row .el-input  {
    display: block
}

.tb-edit .current-row .el-input+span {
    display: none
}
</style>
<script>
/*import Datepicker from 'vue-bulma-datepicker'*/
export default {
  	data: function() {
    	return {
      		input_stock_name: '',
      		stockData1:{
      			stockData:[]
      		},
      		editEable:false,
      		editedTodo:null,
      		dialogFormVisible: false,
      		
			//一条库存新纪录数据
	  		form: { 				
				stockNum: '',
			    stockType: '',
			    stockName: '',
			    Poh:'',
			    unit:'',
			    operatingTime:'',
			    operator:''		        
			},         	
         	
		    multipleSelection: [],

      	}   	
  	},
/*  	components: {
    	Datepicker
  	},*/
  	mounted:function(){

  		this.getList();
  	},

  	methods: {
  		//点击查询图标事件
    	handleIconClick(ev) {
      	console.log(ev);
    	},
    	// 编辑事件
    	// handleEdit(index, row) {
    	// 	var rowItem=row;
    	//  	var rStockNum=rowItem.stockNum;
    		
     //  	},
  //     	editTodo:function(stockNum){
  //     		console.log(this);
		// 	stockNum.beforeEditCache=rowItem.text;
		// 	stockNum.editedTodo=rowItem;
		// },
      	/*dialogFormVisible(index, row) {
        	console.log(index, row);
      	},*/


 		handleCurrentChange(row, event, column) {
 			console.log("a");
            console.log(row, event, column, event.currentTarget)
            },
            handleEdit(index, row) {
                console.log(index, row);
            },
            handleDelete(index, row) {
                console.log(index, row);
            },

      	// 切换选中状态
		toggleSelection(rows) {
        	if (rows) {
          		rows.forEach(row => {
            		this.$refs.multipleTable.toggleRowSelection(row);
          		});
        	} else {
          		this.$refs.multipleTable.clearSelection();
        	}
      	},
        handleSelectionChange(val) {
        	this.multipleSelection = val;
      	},
      	// 选择日期
      	getDate(){
      		let oldDate=this.form.operatingTime;
          		year=new Date(oldDate).getFullYear(),
          		month=new Date(oldDate).getMonth()+1,
          		day=new Date(oldDate).getDate(),
          		dateFormat=year+'-'+month+'-'+day,
          		console.log(dateFormat);
          		return dateFormat;
      	},
      	// 添加事件
		AddStockData(){
			var addThis=this;
			// addThis.operatingTime=addThis.disabledDate;
			addThis.stockData1.stockData.push(addThis.form);
			addThis.dialogFormVisible=false
		},

		// 获取列表动态数据
    	getList:function(){
		    var me = this;
			this.$http.get('../../static/dataJson/stock.json').then(function(response){
					console.log(response)
					console.log("这是stock(库存管理)的json数据",response.data)
					me.stockData1 = response.data;
				}, function(response){
					alert("请求失败了")
				});				
		}
  	}
}
</script>