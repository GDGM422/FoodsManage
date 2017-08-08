<template>
	<div id="index">
		<div class="dd-search">
			<div class="dd_input_name">
    			<el-input v-model="ddlistQuery.id" placeholder="订单编号"></el-input>
    		</div>
    		<div class="dd_input_type">
    			<el-input v-model="ddlistQuery.buyname" placeholder="买家姓名"></el-input>
    		</div>
    		<div class="dd_btn_search">
    			<el-button type="primary" icon="search">搜索</el-button>
    		</div>
    		
    		
  		</div> 

		<div class="dd_table">
			<el-table :data="tableData1.order" border style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}" >
			  		
				    <el-table-column label="订单编号"  width="140" header-align="center">
				    	<template scope="scope">
				    	    <span>{{ scope.row.id }}</span>
				    	</template>
				    </el-table-column>

					<el-table-column label="买家姓名" width="120"  header-align="center">
						<template scope="scope">
				    	    <span>{{ scope.row.buyname }}</span>
				    	</template>
					</el-table-column>

					<el-table-column label="买家手机号" width="180"  header-align="center">
						<template scope="scope">
				    	    <span>{{ scope.row.buytel }}</span>
				    	</template>
					</el-table-column>
					<el-table-column label="下单时间" prop="orderdate" width="160"  sortable header-align="center">
						<template scope="scope">
				    	    <span>{{ scope.row.orderdate }}</span>
				    	</template>
					</el-table-column>
				    <el-table-column label="订单总价"  sortable width="140" prop="orderprice" header-align="center">
				    	<template scope="scope">
				    	    <span>{{ scope.row.orderprice }}</span>
				    	</template>
				    </el-table-column>
				    <el-table-column label="实际支付"  sortable width="140" prop="shiji"  header-align="center"> 
				    	<template scope="scope">
				    	    <span>{{ scope.row.shiji }}</span>
				    	</template>
				    </el-table-column>
			      	<el-table-column label="操作" header-align="center" >
				        <template scope="scope">
				          	<el-button @click="handleClick(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
				        </template>
				        
			    </el-table-column>
			</el-table>
			
		</div>

		

		{{ detailsData.goodsinfo}}

		<el-dialog title="订单详情"  :visible.sync="dialogTableVisible">
			<span></span>
			  <el-table border :data="detailsData.goodsinfo" >
					<el-table-column property="goodsid" label="商品编号" width="100" header-align="center"></el-table-column>
					<el-table-column property="goodsname" label="商品名称" width="150" header-align="center"></el-table-column>
					<el-table-column property="count" label="数量" width="100" header-align="center"></el-table-column>
				    <el-table-column property="gPrice" width="120" label="商品单价" header-align="center"></el-table-column>
				    <el-table-column  property="sumprice" label="商品总价" header-align="center"></el-table-column>
			  </el-table>
		</el-dialog>
				
		<!-- 分页 -->
		<div class="dd_page">
			<!-- 分页 -->
		    <div class="pagination-container">
			      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="ddlistQuery.currPage"
			        :page-sizes="[10,20,30, 50]" :page-size="ddlistQuery.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			      </el-pagination>
		    </div>
		</div>
		{{goodslist}}
		
	
	</div>
</template>
<script>
import store from '../../store/index'
export default {
	name: 'index',
	data() {
		return {
			ddlistQuery:{
				currPage:1,
				id:"",
				buyname:"",
				pageSize:10
			},
   			tableData1:{
   				order:[],
   				goodsinfo:[]
   			},
   			dialogTableVisible: false,
   			detailsData: {
   				goodsinfo :[]
   			},
   			goodslist:store.state.goods.goodslist
	    }	
	},
	mounted:function(){
		this.getlistData();
	},
	methods: {
 		//获取列表数据
	    getlistData:function(){
	    	let me = this;
	    	this.$http.get('../../static/dataJson/OrderData.json').then(function(response){
	    		// alert("请求成功!")
	    		console.log(response)
				console.log("这是我们需要的json数据",response.data)
				me.tableData1=response.data;
				
	    	},function(response){
	    		alert("请求失败!")
	    	});
	    },
	    //操作分页
	    handleSizeChange(val) {
	        console.log('--------一页多少条：',val)
	      this.ddlistQuery.pageSize = val;
	      
	    },
	    //操作分页
	    handleCurrentChange(val) {
	        console.log('--------当前页：',val)
	      this.ddlistQuery.currPage = val;
	      
	    },
	    //查看
	    handleClick(index, row) {
	    	this.dialogTableVisible=true;
	    	this.detailsData = row;
	        console.log(index, row);
	        // let that=this;
	        for(let i=0;i<this.detailsData.goodsinfo.length;i++){
	        	let iDD=this.detailsData.goodsinfo;
	        	let jGoods=this.goodslist;
	        	for(let j=0;j<jGoods.length;j++){
	        		
        			if(jGoods[j].cp_num==iDD[i].goodsid){
	        			iDD[i].goodsname = jGoods[j].cp_name
	        			iDD[i].gPrice = jGoods[j].cp_price
	        			iDD[i].sumprice=iDD[i].gPrice * iDD[i].count;
	        			console.log("1",iDD[i].sumprice)
        			}	
	        	}
	        }
	    },
	    
	   
	}
}

</script>
<style>
	.dd_input_name,.dd_input_type{
		width: 200px;
		float: left;
		margin: 20px 10px 20px 0;
	}
	.dd_btn_search{
		float: left;
		margin: 20px 0 20px 0;
	}
	.dd_btn_del{
		float: left;
		margin: 20px 0 20px 10px;
	}
	.dd_table{
		width: 98%;
		text-align: center;
		margin: auto;
	}
	.dd_page{
		margin-top: 20px;
	}
	tr,th{
	  text-align:center;
	}

</style>