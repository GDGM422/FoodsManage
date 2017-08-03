<template>
<div class="v">
	<!-- 查询 -->
	<div>
		<div class="btn_plsc">
			<el-input placeholder="请输入 名称/手机号" style="width: 200px;" icon="edit" v-model="search">
			</el-input>
			<el-button type="primary" icon="search">搜索</el-button>
		</div>
		<el-button type="primary" class="page" icon="plus" @click="vipCreate">添加</el-button>
	</div>
	<!-- 列表 -->
	<div>
		<el-table :data="vipTableData.vipData" border stripe  style="width: 100%">
			<el-table-column header-align="center" width="52" type="selection">
			</el-table-column>
			<el-table-column header-align="center" width="56" type="index">
			</el-table-column>
			<el-table-column header-align="center" width="116" prop="vipID" label="会员编号" sortable>
			</el-table-column>
			<el-table-column header-align="center" width="116" prop="vipName" label="会员名称">
			</el-table-column>
			<el-table-column header-align="center" width="138" prop="vipPhone" label="手机号码" sortable>
			</el-table-column>
			<el-table-column header-align="center" width="138" prop="vipJoinDate" label="入会时间" sortable>
			</el-table-column>
			<el-table-column header-align="center" width="99" prop="vipScore" label="积分">
			</el-table-column>
			<el-table-column header-align="center" width="99" prop="vipGrade" label="等级"
			:filters="[{text:'金',value:'金'},{text:'银',value:'银'},{text:'铜',value:'铜'}]"
			:filter-method="vipfilterTag" filter-placement="bottom-end">
			</el-table-column>
			<el-table-column header-align="center" width="122" prop="vipDiscount" label="享受折扣" sortable>
			</el-table-column>
			<el-table-column header-align="center" label="操作">
				<template scope="scope">
					<el-button @click="vipEdit(scope.$index, scope.row)" icon="edit">编辑</el-button>
					<el-button type="danger" 
					@click="viphandleDelete(scope.$index, scope.row)" icon="circle-cross">删除</el-button>
				</template>
			</el-table-column>
		</el-table>
	</div>
	<!-- 底部 -->
	<div>
		<!--disabled值动态显示，默认为true,当选中复选框后值为false--> 
		<el-button type="warning" class="btn_plsc" icon="circle-cross">批量删除</el-button>
		<!-- 页码数 -->
		<div class="page">
			<el-pagination @size-change="vipSizeChange" @current-change="vipCurrentChange"
			:current-page.sync="vcurrentPage" :page-size="12"
			layout="total, prev, pager, next, jumper" :total="400">
			</el-pagination>
		</div>
	</div>
	<!-- 添加会员弹窗 -->
	<el-dialog :visible.sync="v_dialogFormVisible" title="添加会员" custom-class="addvip">
		<el-form :model="addnewV" label-width="83px">
			<el-form-item label="会员编号：">
				<el-input v-model="addnewV.vipID" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="会员姓名：">
				<el-input v-model="addnewV.vipName" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="手机号码：">
				<el-input v-model="addnewV.vipPhone" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="注册时间：">
				<el-date-picker type="date" placeholder="选择注册时间" v-model="addnewV.vipJoinDate"  style="width: 220px">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="初始积分：">
				<el-input v-model="addnewV.vipScore" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="等级：">
				<el-input v-model="addnewV.vipGrade" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="折扣：">
				<el-input v-model="addnewV.vipDiscount" style="width: 220px"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="v_dialogFormVisible = false">取 消</el-button>
			<el-button type="primary"  @click="v_CreateSubmit">提 交</el-button>
		</div>
	</el-dialog>
</div>
</template>

<script>
export default {
    data() {
    	return {
    		vipTableData:{ vipData:[] },
			vcurrentPage: 1, 
			search: "",
			v_dialogFormVisible: false,
			addnewV: {
				"vipID": "",
				"vipName": "",
				"vipPhone": "",
				"vipJoinDate": "",
				"vipScore": "330",
				"vipGrade": "铜",
				"vipDiscount": "9折"
			}
    	}
    },
	// 页面加载完后自动调用方法
	mounted: function(){
		this.getData();
	},
	// 页面加载时加载
	methods: {
		//获取数据的方法
		getData: function(){
			let that = this;
			this.$http.get('../../static/dataJson/vipData.json').then(function(response){
				console.log(response.data)
				that.vipTableData = response.data
			},function(response){
			})
		},
		// 等级-数据过滤使用的方法
		vipfilterTag(value, row) {
			return row.vipGrade === value;
		},
		// 分页-pageSize 改变时触发
		vipSizeChange(val) {
			console.log(`每页 ${val} 条`);
		},
		// 分页-currentPage 改变时触发
		vipCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		// 单个删除
		viphandleDelete(index, row) {
			// console.log(index, row);
			// 前端删除
			this.vipTableData.vipData.splice(index,1)
		},
		// 跳转编辑
		vipEdit(index, row) {
			console.log(index, row);
		},
		//新增
	    vipCreate() {
	        this.v_dialogFormVisible = true;
	    },
	    //新增提交
	    v_CreateSubmit(){
	        var vm = this;
	        console.log('新增会员：' , vm.addnewV , vm.vipTableData.vipData)
	        vm.vipTableData.vipData.push(vm.addnewV)
	        console.log('新增后',vm.vipTableData.vipData)
	        this.v_dialogFormVisible = false;
	    }	
	}
}
</script>

<style>
	.v{
		padding: 25px;
	}
	.v .btn_plsc{
		float: left;
		margin: 12px 32px;
	}
	.v .page{
		float: right;
		margin: 12px 36px;
	}
	.addvip{
		width: 420px;
		padding: 35px;
		border-radius: 6px;
	}
</style>