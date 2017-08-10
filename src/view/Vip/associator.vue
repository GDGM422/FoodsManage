<template>
<div class="v">
	<!-- 查询 -->
	<div>
		<div class="btn_plsc">
			<el-input placeholder="请输入 名称/手机号" style="width: 200px;" icon="edit" v-model="searchV">
			</el-input>
			<el-button type="primary" icon="search" @click="vipSearch">搜索</el-button>
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
			<el-pagination @current-change="vipCurrentChange"
			 :page-size="8" :current-page.sync="vcurrentPage"
			layout="total, prev, pager, next, jumper" :total="vipTableData.vipData.length">
			</el-pagination>
			<!-- https://segmentfault.com/q/1010000010284670 -->
		</div>
	</div>
	<!-- 添加会员弹窗 -->
	<el-dialog :visible.sync="v_dialogFormVisible" title="添加会员" size="622px" @close="v_dialogClose">
		<el-form :model="addnewV" label-width="83px">
			<el-form-item label="会员编号：">
				<el-input v-model="addnewV.vipID" style="width: 220px"></el-input>
				<el-alert title="请输入数字" type="error" v-show="showEroll_v1" class="showE" @close="v_erollClose"></el-alert>
			</el-form-item>
			<el-form-item label="会员姓名：">
				<el-input v-model="addnewV.vipName" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="手机号码：">
				<el-input v-model="addnewV.vipPhone" style="width: 220px"></el-input>
				<el-alert title="请输入数字" type="error" v-show="showEroll_v1" class="showE" @close="v_erollClose"></el-alert>
				<el-alert title="请输入11位数字" type="error" v-show="showEroll_v2" class="showE" @close="v_erollClose"></el-alert>
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
			<el-alert title="各均不能为空或格式错误" type="error" v-show="showEroll_v3" style="width: 100%;text-align: center;" @close="v_erollClose"></el-alert>
			<el-button @click="v_dialogFormVisible = false">取 消</el-button>
			<el-button type="primary"  @click="v_CreateSubmit">提 交</el-button>
		</div>
	</el-dialog>
	<!-- 编辑会员弹窗 -->
	<el-dialog :visible.sync="v_dialogEdit" title="修改会员信息" size="622px"  @close="v_dialogClose">
		<el-form :model="editV" label-width="83px">
			<el-form-item label="会员编号：">
				<el-input v-model="editV.vipID" style="width: 220px"></el-input>
				<el-alert title="请输入数字" type="error" v-show="showEroll_v4" class="showE" @close="v_erollClose"></el-alert>
			</el-form-item>
			<el-form-item label="会员姓名：">
				<el-input v-model="editV.vipName" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="手机号码：">
				<el-input v-model="editV.vipPhone" style="width: 220px"></el-input>
				<el-alert title="请输入数字" type="error" v-show="showEroll_v4" class="showE" @close="v_erollClose"></el-alert>
				<el-alert title="请输入11位数字" type="error" v-show="showEroll_v5" class="showE" @close="v_erollClose"></el-alert>
			</el-form-item>
			<el-form-item label="注册时间：">
				<el-date-picker type="date" placeholder="选择注册时间" v-model="editV.vipJoinDate"  style="width: 220px">
				</el-date-picker>
			</el-form-item>
			<el-form-item label="初始积分：">
				<el-input v-model="editV.vipScore" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="等级：">
				<el-input v-model="editV.vipGrade" style="width: 220px"></el-input>
			</el-form-item>
			<el-form-item label="折扣：">
				<el-input v-model="editV.vipDiscount" style="width: 220px"></el-input>
			</el-form-item>
		</el-form>
		<div slot="footer" class="v_dialogEditXG">
			<el-alert title="各均不能为空或格式错误" type="error" v-show="showEroll_v6" style="width: 100%;text-align: center;" @close="v_erollClose"></el-alert>
			<el-button @click="v_dialogEdit = false">取 消</el-button>
			<el-button type="primary" @click="v_EditSubmit">修 改</el-button>
		</div>
	</el-dialog>
	{{ OrderData }}
</div>
</template>

<script>
import store from '../../store/index';

export default {
    data() {
    	return {
    		vipTableData:{ vipData:[] },
			viplist:store.state.vip.vipData,
			vcurrentPage: 1, 
			searchV: "",
			v_dialogFormVisible: false,
			addnewV: {
				"vipID": "",
				"vipName": "",
				"vipPhone": "",
				"vipJoinDate": "",
				"vipScore": "330",
				"vipGrade": "铜",
				"vipDiscount": "9折"
			},
			showEroll_v1: false,
			showEroll_v2: false,
			showEroll_v3: false,
			showEroll_v4: false,
			showEroll_v5: false,
			showEroll_v6: false,
			v_dialogEdit: false,
			editV: {
				"vipID": "",
				"vipName": "",
				"vipPhone": "",
				"vipJoinDate": "",
				"vipScore": "",
				"vipGrade": "",
				"vipDiscount": ""
			},
			editIndexV: "",
			OrderDataArray: []
    	}
    },
	// 页面加载完后自动调用方法
	mounted: function(){
		this.getData();
		this.getddData();
	},
	// 页面加载时加载
	methods: {
		//获取数据的方法
		getData: function(){
			let that = this;
			this.$http.get('../../static/dataJson/vipData.json').then(function(response){
				that.vipTableData = response.data
				that.vipTableData.vipData = that.viplist
			},function(response){
				console.log("请求失败")
			})
		},
		//获取 订单管理 数据的方法,再根据 订单数 跟新 积分数,之间用电话号码链接
		getddData: function(){
			let that = this;
			this.$http.get('../../static/dataJson/OrderData.json').then(function(response){
				that.OrderDataArray = response.data.order
				for(let i=0 ; i < that.vipTableData.vipData.length ; i++){
					let iVP = that.vipTableData.vipData[i].vipPhone;
					for(let j=0 ; j < that.OrderDataArray.length ; j++){
						let jOP = that.OrderDataArray[j].buytel;
						if( iVP == jOP){
							that.vipTableData.vipData[i].vipScore = parseInt(that.vipTableData.vipData[i].vipScore)+10
						}
					}
					let vs = parseInt(that.vipTableData.vipData[i].vipScore);
					if( vs<660 ){
						that.vipTableData.vipData[i].vipGrade = "铜";
						that.vipTableData.vipData[i].vipDiscount = "9折";
					}else if( vs<1200 ){
						that.vipTableData.vipData[i].vipGrade = "银";
						that.vipTableData.vipData[i].vipDiscount = "8折";
					}else{
						that.vipTableData.vipData[i].vipGrade = "金";
						that.vipTableData.vipData[i].vipDiscount = "7折";
					}
				}
			},function(response){
			})
		},
		// 等级-数据过滤使用的方法
		vipfilterTag(value, row) {
			return row.vipGrade === value;
		},
		// 分页-currentPage 改变时触发
		vipCurrentChange(val) {
			console.log(`当前页: ${val}`);
		},
		// 单个删除
		viphandleDelete(index, row) {
			// 前端删除
			this.vipTableData.vipData.splice(index,1)
		},
		//新增
	    vipCreate() {
	        this.v_dialogFormVisible = true;
	    },
	    //新增提交
	    v_CreateSubmit(){
	        let vm = this;
	        // 修改日期格式
	        let oldDate = vm.addnewV.vipJoinDate;
	        let year = new Date(oldDate).getFullYear();
	        let month = new Date(oldDate).getMonth()+1;
	        let day = new Date(oldDate).getDate();
	        if (month < 10) { month = "0" + month};
	        if (day < 10) { day = "0" + day};
	        vm.addnewV.vipJoinDate = year + "-" + month + "-" + day;

	        // 检测会员编号和手机号码需为数字
	        let re = /^[0-9]+.?[0-9]*$/; //正则表达式判断字符串是否为数字
	        let id = vm.addnewV.vipID;
	        let phone = vm.addnewV.vipPhone;
	        const vn = vm.addnewV.vipName.replace(/(^s*)|(s*$)/g, "");
	        const vd = vm.addnewV.vipJoinDate;
	        if ( !re.test(id) || !re.test(phone) ) {
	        	vm.showEroll_v1 = true;
	        }else if( phone.length != 11) {
	        	vm.showEroll_v2 = true;
	        }else if( vn.length==0 || vd=="NaN-NaN-NaN" ) {
	        	vm.showEroll_v3 = true;
	        }else{
	        	//console.log('新增会员：' , vm.addnewV , vm.vipTableData.vipData)
		        vm.vipTableData.vipData.push(vm.addnewV)
		        //console.log('新增会员后',vm.vipTableData.vipData)

				// 成功提交后关闭弹出框
		        this.v_dialogFormVisible = false;
	        }
	    },
	    // 关闭 错误信息提示框 时触发
	    v_erollClose(){
	    	this.showEroll_v1 = false
			this.showEroll_v2 = false
			this.showEroll_v3 = false
			this.showEroll_v4 = false
			this.showEroll_v5 = false
			this.showEroll_v6 = false
	    },
	    // 关闭 新增/修改 弹出框 时触发：再次打开清零
	    v_dialogClose(){
	    	this.addnewV = {
				"vipID": "",
				"vipName": "",
				"vipPhone": "",
				"vipJoinDate": "",
				"vipScore": "330",
				"vipGrade": "铜",
				"vipDiscount": "9折"
			};
			this.editV = {
				"vipID": "",
				"vipName": "",
				"vipPhone": "",
				"vipJoinDate": "",
				"vipScore": "",
				"vipGrade": "",
				"vipDiscount": ""
			}
			this.showEroll_v1 = false
			this.showEroll_v2 = false
			this.showEroll_v3 = false
			this.showEroll_v4 = false
			this.showEroll_v5 = false
			this.showEroll_v6 = false
	    },
		// 跳转编辑修改
		vipEdit(index, row) {
			this.v_dialogEdit = true;
			// 获取点击行的数据显示到弹出框里
				// 写法一：浅拷贝
				/*this.editV.vipID = row.vipID;
				this.editV.vipName = row.vipName;
				this.editV.vipPhone = row.vipPhone;
				this.editV.vipJoinDate = row.vipJoinDate;
				this.editV.vipScore = row.vipScore;
				this.editV.vipGrade = row.vipGrade;
				this.editV.vipDiscount = row.vipDiscount;*/
				// 写法二：浅拷贝
				/*this.editV = row*/
				// 写法三：把对象转为字符串 再 转为对象，借此解决vue双向绑定问题
				this.editV = JSON.parse(JSON.stringify(row))
			// 赋予下标值
			this.editIndexV = index;
		},
		// 点击 编辑框内修改按钮 触发
		v_EditSubmit(){
			let it = this;
			// 定义获取下标值
			let idx = it.editIndexV;
			// 修改日期格式
	        let oldDate = it.editV.vipJoinDate;
	        let year = new Date(oldDate).getFullYear();
	        let month = new Date(oldDate).getMonth()+1;
	        let day = new Date(oldDate).getDate();
	        if (month < 10) { month = "0" + month};
	        if (day < 10) { day = "0" + day};
	        it.editV.vipJoinDate = year + "-" + month + "-" + day;

	        // 检测会员编号和手机号码需为数字
	        let re = /^[0-9]+.?[0-9]*$/; //正则表达式判断字符串是否为数字
	        let id = it.editV.vipID;
	        let phone = it.editV.vipPhone;
	        let vn = it.editV.vipName.replace(/(^s*)|(s*$)/g, "");
	        let vd = it.editV.vipJoinDate;
	        let vs = it.editV.vipScore;
	        let vg = it.editV.vipGrade;
	        let vdis = it.editV.vipDiscount;
	        if ( !re.test(id) || !re.test(phone) ) {
	        	it.showEroll_v4 = true;
	        }else if( phone.length != 11) {
	        	it.showEroll_v5 = true;
	        }else if( vn.length==0 || vd=="NaN-NaN-NaN" || vs.length==0 || vg.length==0 || vdis.length==0 ) {
	        	it.showEroll_v6 = true;
	        }else{
	        	// 根据下标值替换
				it.vipTableData.vipData.splice(idx,1,it.editV);
				it.v_dialogEdit = false;
	        }
		},
		// 点击搜索按钮触发
		vipSearch(){
			console.log(this.searchV)
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
	
	.showE{
		width: 228px;
		line-height: 12px;
	}
	.v_dialogEditXG{
		text-align: center;
	}
</style>