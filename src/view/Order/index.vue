<template>
	<div id="index">
		<!-- 查询搜索 -->
		<div class="dd-search">
			<div class="dd_input_name">
    			<el-input v-model="ddlistQuery.id" placeholder="订单编号"></el-input>
    		</div>
    		<div class="dd_input_type">
    			<el-input v-model="ddlistQuery.buyname" placeholder="买家姓名"></el-input>
    		</div>
    		<div class="dd_btn_search">
    			<el-button type="primary" icon="search" @click="handleQuery()" >搜索</el-button>
    		</div>
    	</div>

		<!-- 表格数据 -->
		<div class="dd_table">
			<el-table :data="tableData1.order" border style="width: 100%" :default-sort = "{prop: 'id', order: 'descending'}" >

				    <el-table-column label="订单编号"  header-align="center">
				    	<template scope="scope">
				    	    <span>{{ scope.row.id }}</span>
				    	</template>
				    </el-table-column>

					<el-table-column label="买家姓名"  header-align="center">
						<template scope="scope">
				    	    <span>{{ scope.row.buyname }}</span>
				    	</template>
					</el-table-column>

					<el-table-column label="买家手机号"  header-align="center">
						<template scope="scope">
				    	    <span>{{ scope.row.buytel }}</span>
				    	</template>
					</el-table-column>

					<el-table-column label="下单时间" prop="orderdate"  sortable header-align="center">
						<template scope="scope">
							<el-icon name="time"></el-icon>
				    	    <span>{{ scope.row.orderdate }}</span>
				    	</template>
					</el-table-column>

				    <el-table-column label="订单总价"  sortable  prop="orderprice" header-align="center">
				    	<template scope="scope">
				    	    <span>{{ scope.row.orderprice }}</span>
				    	</template>
				    </el-table-column>

				    <el-table-column label="实际支付"  sortable  prop="shiji"  header-align="center"> 
				    	<template scope="scope">
				    	    <span>{{ scope.row.shiji }}</span>
				    	</template>
				    </el-table-column>

			      	<el-table-column label="操作" header-align="center"  width="140">
				        <template scope="scope">
				          	<el-button @click="handleClick(scope.$index, scope.row)" type="primary" size="small">查看</el-button>
				        </template>
				        
			    </el-table-column>
			</el-table>
			
		</div>


		<!-- 订单详情 -->
		<el-dialog title="订单详情"  :visible.sync="dialogTableVisible" :modal-append-to-body="false">
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
			      <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="page.currPage"
			        :page-sizes="[10,20,30, 50]" :page-size="page.pageSize" layout="total, sizes, prev, pager, next, jumper" :total="total">
			      </el-pagination>
		    </div>
		</div>
		
	
	</div>
</template>
<script>
import store from '../../store/index'
import { api } from '../../global/api'
export default {
	name: 'index',
	data() {
		return {
			// 查询
			ddlistQuery:{	
				id:"",
				buyname:""
			},
			//分页
			page:{
				currPage:1,
				pageSize:10
			},
			// 存放json数据
   			tableData1:{
   				order:[],
   				goodsinfo:[]
   			},
   			// 查看弹出框的显示状态
   			dialogTableVisible: false,
   			// 查看弹出框的表格数据
   			detailsData: {
   				goodsinfo :[]
   			},
   			// 从商品管理获取数据
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
	    	this.$http.get(api.OrderData).then(function(response){
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
	    // 查询搜索
	    handleQuery(){
	    	let me = this;
	    	this.$http.get(api.OrderData,{params:{"id":me.ddlistQuery.id,"buyname":me.ddlistQuery.buyname}}).then(function(response){
	    		// alert("请求成功!")
	    		console.log(response)
				console.log("这是我们需要的json数据",response.data)
				me.tableData1=response.data;


				console.log("查询成功!!")
				var idarr=[];//id数组存放表格所有id
				var namearr=[];//name数组存放表格所有buyname
				var queryarr=[];//query数组存放所在id或所在buyname的某个对像
	         	var l=me.tableData1.order.length;
	         	for(let i=0;i<l;i++){
	         	    idarr.push(me.tableData1.order[i].id)  //将表格中的所有ID放进一个数组
	         	    namearr.push(me.tableData1.order[i].buyname)//将表格中的买家姓名所有放进一个数组
	         	}
	         	var idexist=idarr.indexOf(me.ddlistQuery.id);//idexist存放id数组返回回来的下标值
	         	var nameexist=namearr.indexOf(me.ddlistQuery.buyname);//nameexist存放name数组返回回来的下标值
	         	//判断id或name值的各种情况
	         	if(me.ddlistQuery.id==""&&me.ddlistQuery.buyname==""){
 			        this.$message.success('查询所有数据成功！！');
	         	}else{
 		         	if(idexist==-1){
 		         		if(nameexist!==-1){
 		         			let index=nameexist;
 		         			this.$message.success('查询姓名成功！！');
 		         			let j;
 		         			for(j=0;j<l;j++){
 		         				if(me.tableData1.order[j].buyname==me.ddlistQuery.buyname){
 		         					queryarr.push(me.tableData1.order[j])
 		         				}else{}
 		         			}
 		         			me.tableData1.order=queryarr;	
 		         		}else{
 		         			this.$message.error('该编号不存在！！');
 		         		}
 		         	}else if(nameexist==-1){
 		         		if(idexist!==-1){
 		         			let index=idexist
 			         		queryarr.push(me.tableData1.order[index])
 			         		me.tableData1.order=queryarr;
 			         		this.$message.success('查询编号成功！！');
 		         		}
 		         	}else{
 		         		let idindex=idexist        		
 		         		queryarr.push(me.tableData1.order[idindex])
 		         		let j;
	         			for(j=0;j<l;j++){
	         				if(me.tableData1.order[j].buyname==me.ddlistQuery.buyname){
	         					queryarr.push(me.tableData1.order[j])
	         				}else{}
	         			}
	         			me.tableData1.order=queryarr;	
 		         		this.$message.success('根据编号和买家姓名查询成功！！');
 		         	}
	         	}       		
	    	},function(response){
	    		alert("请求失败!")
	    	});
	    }
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