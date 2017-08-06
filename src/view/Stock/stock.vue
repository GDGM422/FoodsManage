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
			    :data="stockData1.stockData"
			    border
			    tooltip-effect="dark"
			    style="width: 100%"
			     :default-sort = "{prop: 'operatingTime', order: 'descending',prop: 'stockNum',order:'ascending'}"
			    @selection-change="handleSelectionChange">
			    <el-table-column
			      type="selection"
			      width="55">
			    </el-table-column>
			    <el-table-column
			      label="库存编号"
			      sortable prop="stockNum"
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.stockNum }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="stockType"
			      label="类型"
			      sortable
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.stockType }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="stockName"
			      label="货物名称"
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.stockName }}</template>
			    </el-table-column>
			    <el-table-column
			      prop="Poh"
			      label="现有库存量"
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.Poh }}</template>
			    </el-table-column>
				<el-table-column
			      prop="unit"
			      label="单位"
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.unit }}</template>
			    </el-table-column>
			    <el-table-column
			      label="操作时间"
			      show-overflow-tooltip
			      sortable prop="operatingTime"
			      header-align="center">
			        <template scope="scope">
	        			<el-icon name="time"></el-icon>
	        			<span style="margin-left: 10px">{{ scope.row.operatingTime }}</span>
	        	    </template>
			    </el-table-column>
			    <el-table-column
			      prop="operator"
			      label="操作人"		      
			      width="120"
			      header-align="center">
			      <template scope="scope">{{ scope.row.operator }}</template>
			    </el-table-column>
			    <el-table-column		      
			      label="操作"		      
			      show-overflow-tooltip
			      header-align="center">
			      <template scope="scope">
	        		<el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>        		
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
		      <el-input v-model="form.stockType" auto-complete="off"></el-input>
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
				<el-input v-model="form.unit" auto-complete="off"></el-input>
					<template>
			  			<datepicker placeholder="European Format ('d-m-Y')" :config="{ dateFormat: 'd-m-Y', static: true }" @change="dateChange"> 						
			  			</datepicker>
				</template>
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
/* .formWidth{
	width: 400px;
	text-align: center;
}
.formLabelWidth{
	width: 100px;
} 
.formInputWidth{
	width:90px;
 
}*/

/* //暂时性解决diolag 问题 https://github.com/ElemeFE/element/issues/2461 */
.el-dialog {
  transform: none;
  left: 0;
  position: relative;
  margin: 0 auto;
}
</style>
<script>
/*import Datepicker from 'vue-bulma-datepicker'*/
export default {
	name:'stock',
  	data() {
    	return {
      		input_stock_name: '',
      		stockData1:{
      			stockData:[]
      		},
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
    	handleEdit(index, row) {
        	console.log(index, row);
      	},
      	/*dialogFormVisible(index, row) {
        	console.log(index, row);
      	},*/
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