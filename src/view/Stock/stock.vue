<template>
	<div class="stock_wrap">
		<!-- 按货物名称查询 -->
		<div class="stock_top" style="margin:10px;height:35px;">
			<el-input placeholder="按货物名称查询" icon="search" :on-icon-click="handleIconClick" style="float:left;width:200px;margin-right:10px;">
			</el-input>
			<el-button type="primary"  @click="dialogFormVisible = true"  style="float:left;width:150px;">添加库存记录</el-button>
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
			      <span>{{ scope.row.stockType }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="stockName"
			      label="货物名称"
			      width="120"
			      header-align="center">
			      <template scope="scope">			      
			      <span>{{ scope.row.stockName }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      prop="Poh"
			      label="现有库存量"
			      width="120"
			      header-align="center">
			      <template scope="scope">			      
			      <span>{{ scope.row.Poh }}</span>
			      </template>
			    </el-table-column>
				<el-table-column
			      prop="unit"
			      label="单位"
			      width="120"
			      header-align="center">
			      <template scope="scope">  			    
			      <span>{{ scope.row.unit }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column
			      label="操作时间"
			      show-overflow-tooltip
			      sortable prop="operatingTime"
			      header-align="center">
			        <template scope="scope">			               			
	        		<span style="margin-left: 10px"><el-icon name="time"></el-icon>{{ scope.row.operatingTime }}</span>
	        	    </template>
			    </el-table-column>
			    <el-table-column
			      prop="operator"
			      label="操作人"		      
			      width="120"
			      header-align="center">
			      <template scope="scope">			     
			      <span>{{ scope.row.operator }}</span>
			      </template>
			    </el-table-column>
			    <el-table-column		      
			      label="操作"		      
			      show-overflow-tooltip
			      header-align="center">
			      <template scope="scope">			      
	        		<el-button @click="editStock(scope.$index, scope.row)" icon="edit">编辑</el-button>        	
	        	  </template>
			    </el-table-column>
			</el-table>		
		</div>
		<!-- 页码数 -->
		<div class="page">
			<el-pagination @size-change="stockSizeChange" @current-change="stockCurrentChange"
			:current-page.sync="stockcurrentPage" :page-size="12"
			layout="total, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>	

		<!-- 添加库存记录弹出框 -->
		<el-dialog title="添加库存记录" :visible.sync="dialogFormVisible" size="622px">
		  <el-form :model="form"  label-width="83px">
		    <el-form-item label="库存编号">
		      <el-input v-model="form.stockNum" auto-complete="off" style="width: 220px"></el-input>
		    </el-form-item>
		    <el-form-item label="类型">
		      <el-input v-model="form.stockType" auto-complete="off" style="width: 220px"></el-input>
		    </el-form-item>
		    <el-form-item label="货物名称">
		      <el-input v-model="form.stockName" auto-complete="off"   style="width: 220px"></el-input>
		    </el-form-item>
		    <el-form-item label="现有库存量">
		      <el-input v-model="form.Poh" auto-complete="off"  style="width: 220px"></el-input>
		    </el-form-item>
		    <el-form-item label="单位">
		      <el-input v-model="form.unit" auto-complete="off"  style="width: 220px"></el-input>
		    </el-form-item>
		     <el-form-item label="操作时间">
		      <el-date-picker type="date" placeholder="选择时间" v-model="form.operatingTime"  style="width: 220px">
			  </el-date-picker>
		    </el-form-item>
		    <el-form-item label="操作人">
		      <el-input v-model="form.operator" auto-complete="off"  style="width: 220px"></el-input>
		    </el-form-item>
		  </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button @click="dialogFormVisible = false">取 消</el-button>
		    <el-button type="primary" @click="AddStockData">确定添加</el-button>
		  </div>
		</el-dialog>

		<!-- 编辑库存记录弹窗 -->
		<el-dialog :visible.sync="stockEditDialogVisible" title="修改库存信息" size="622px" >
			<el-form :model="stockEditData" label-width="83px">
		    	<el-form-item label="类型">
		      		<el-input v-model="stockEditData.stockType" auto-complete="off" style="width: 220px" ></el-input>
		    	</el-form-item>
		    	<el-form-item label="货物名称">
		      		<el-input v-model="stockEditData.stockName" auto-complete="off" style="width: 220px"></el-input>
		    	</el-form-item>
		    	<el-form-item label="现有库存量">
		      		<el-input v-model="stockEditData.Poh" auto-complete="off" style="width: 220px"></el-input>
		    	</el-form-item>
		    	<el-form-item label="单位">
		      		<el-input v-model="stockEditData.unit" auto-complete="off" style="width: 220px"></el-input>
		    	</el-form-item>
		     	<el-form-item label="操作时间">
		      		<el-date-picker type="date" placeholder="选择修改时间" v-model="stockEditData.operatingTime"  style="width: 220px">
				</el-date-picker>
		    	</el-form-item>
		    	<el-form-item label="操作人">
		      		<el-input v-model="stockEditData.operator" auto-complete="off"  style="width: 220px"></el-input>
		    	</el-form-item>
		  	</el-form>
		  	<div slot="footer" class="dialog-footer">
		    	<el-button @click="stockEditDialogVisible = false">取 消</el-button>
		    	<el-button type="primary" @click="editStockSubmit">提交</el-button>
		  	</div>
		</el-dialog>
	</div>		
</template>

<style>

.page{
	margin: 10px;
} 
</style>
<script>
import store from '../../store/index'
export default {
  	data: function() {
    	return {
      		stockData1:{
      			stockData:[]
      		},
      		stockList:store.state.stock.stockData,
      		// stockList:this.$store.state.stock.stockData,
      		stockcurrentPage:1,
      		dialogFormVisible: false,
      		stockEditDialogVisible: false,
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
			//编辑库存对话框的数据
			stockEditData: { 				
				stockNum: '',
			    stockType: '',
			    stockName: '',
			    Poh:'',
			    unit:'',
			    operatingTime:'',
			    operator:''		        
			},         	       	
			editStockIndex: "",
		    multipleSelection: [],
      	}   	
  	},
  	mounted:function(){
  		this.getList();
  	},
  	methods: {
  		//点击查询图标事件
    	handleIconClick(ev) {
      	console.log(ev);
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
      	
      	// 分页-pageSize 改变时触发
		stockSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		// 分页-currentPage 改变时触发
		stockCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},

      	// 添加事件
		AddStockData(){
			var addThis=this;
			// 修改日期格式
	        let oldDate = addThis.form.operatingTime;
	        let year = new Date(oldDate).getFullYear();
	        let month = new Date(oldDate).getMonth()+1;
	        let day = new Date(oldDate).getDate();
	        if (month < 10) { month = "0" + month};
	        if (day < 10) { day = "0" + day};
	        addThis.form.operatingTime = year + "-" + month + "-" + day;
			addThis.stockData1.stockData.push(addThis.form);
			addThis.dialogFormVisible=false
		},

		// 获取列表动态数据
    	getList:function(){
		    var me = this;
			this.$http.get('../../static/dataJson/stock.json').then(function(response){
					console.log(response);
					console.log("这是stock(库存管理)的json数据",response.data);
					me.stockData1 = response.data;
					me.stockData1.stockData=me.stockList;
				}, function(response){
					alert("请求失败了")
			});				
		},
		// 编辑库存按钮事件:点击编辑按钮，弹出编辑对话框
		editStock(index, row) {
			console.log("点击编辑成功");
			this.stockEditDialogVisible = true;
			// 对参数row进行深拷贝，为解决双向绑定带来的影响
			this.stockEditData = JSON.parse(JSON.stringify(row));
			this.editStockIndex = index;
		},
		// 编辑库存对话框中的提交按钮事件：点击提交按钮后，页面数据更新
		editStockSubmit(){
			console.log("点击成功");
			// 获取要编辑的那行下标
			let editingId = this.editStockIndex;
			// 修改日期格式
	        let oldDate = this.stockEditData.operatingTime;
	        console.log(oldDate)
	        let year = new Date(oldDate).getFullYear();
	        let month = new Date(oldDate).getMonth()+1;
	        let day = new Date(oldDate).getDate();
	        if (month < 10) { month = "0" + month};
	        if (day < 10) { day = "0" + day};
	        this.stockEditData.operatingTime= year + "-" + month + "-" + day;
	        console.log("day",day);
	        // this.stockEditData.operatingTime =this.datepickers.date;
			// 根据下标删除原本那行的数据，添加修改后的数据
			this.stockData1.stockData.splice(editingId,1,this.stockEditData);
			this.stockEditDialogVisible = false;
			this.stockEditData = {
				stockNum: '',
			    stockType: '',
			    stockName: '',
			    Poh:'',
			    unit:'',
			    operatingTime:'',
			    operator:''	
			}       	
		},
  	}
}
</script>