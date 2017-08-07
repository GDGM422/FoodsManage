<template>
	<div>
	<el-collapse >
		  <el-collapse-item title="各大支出" name="2">
		      <el-table :data="form0.pay" >
		            <el-table-column align="center" label='开销' width="">
		              <template scope="scope">
		                  <span v-if="editIndex !== scope.$index">{{ scope.row.thing }}</span>
		                  <el-input size="small" v-model="inputPay.thing" v-else></el-input>
		              </template>
		            </el-table-column>
		            <el-table-column align="center" label="金额(元/月) " width="" > 
		              <template scope="scope">
		                  <span v-if="editIndex !== scope.$index">{{ scope.row.money }}</span>
		                  <el-input size="small" v-model="inputPay.money" v-else></el-input>
		              </template>            
		            </el-table-column>
		        <el-table-column align="center"  label="操作" >
		                    <template scope="scope">
		                       <el-button  type="primary" @click="editPay(scope.$index,scope.row)" size="small" icon="edit" v-if="editIndex !== scope.$index">编辑</el-button>
		                       <el-button type="success" @click="finishTest(scope.$index)" size="small" icon="check" v-else>完成</el-button>
		                       <el-button icon="delete" size="small" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button><!--  -->
		                    </template>
		          </el-table-column>
		      </el-table> 
		        
		        <!-- 新增弹框============================================================================== -->
		      <el-dialog title="新增支出"  :visible.sync="dialogFormVisible">
		            <el-form :model="form" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
		              <el-form-item label="开销">
		                <el-input v-model="form.thing"></el-input><!-- v-model="roleTemp.roleName" -->
		              </el-form-item>
		              <el-form-item label="金额">
		                <el-input v-model="form.money"></el-input>
		              </el-form-item>
		            </el-form>

		            <div slot="footer" class="dialog-footer">
		              <el-button @click="dialogFormVisible = false">取 消</el-button>             
		              <el-button type="primary" @click="Submit">确 定</el-button>
		            </div>
		      </el-dialog>
		      <el-button class="filter-item" type="primary" @click="dialogFormVisible = true" icon="edit" >新增支出</el-button>
		      <p>总支出：{{ totalpay }}  </p>
		  </el-collapse-item>
    </el-collapse>
	</div>
</template>

<script>
  import store from '../../store/index'
  export default {
    name: 'index',
    data() {
      return {
        //从json获取数据
        form0:{ 
            pay:[],
        },
      storecostlist:store.state.cost.costlist,
        //折叠属性        
        activeNames: ['1'],
        //新增弹框条件
        dialogFormVisible: false,
        //第二行
        form: {
          thing: '',
          money: ''
        },
        //用来存储修改后的数据
        edit:{},
        //获取编辑下标
        editIndex:'',
        //编辑input
        inputPay:{
          thing:"",
          money:""
        }
      };
    },
    mounted:function(){
      this.getData();
      this.add;
    },
    computed:{
        //计算支出金额
        totalpay:function(){
          let pay=0;
          for(let i=0;i<this.form0.pay.length;i++){
            let m=this.form0.pay[i].money;
            let m2=parseInt(m)
            pay+=m2;
            //console.log(this.form0.pay[i].money)
          } 
          return pay
        },
    },
    methods:{
        //第二行的新增      
        Submit(){
            var that = this;
            console.log('新增入参：',that.form)
            that.form0.pay.push(that.form)
            console.log('新增后',that.form)            
            that.dialogFormVisible = false;
            that.form={
              thing: '',
              money: ''
            }
        },
        Delete(index,row){
            var that = this;
            console.log('单个删除选择的row：',index,'-----',row);
            that.form0.pay.splice(index,1)
        },
        //编辑支出
        editPay(index,row){
          this.editIndex=index;
          this.inputPay=JSON.parse(JSON.stringify(row))
        },
        // 深拷贝完成支出
        finishTest(index){
            this.editIndex=null
            this.form0.pay[index].thing=this.inputPay.thing
            this.form0.pay[index].money=this.inputPay.money
            console.log(this.form0.test[index].money)
          },
        //获取json
        getData:function(){
          let that = this;
          that.$http.get('../../static/dataJson/Cost.json').then(
          function(response){
            console.log(response);
                // alert("请求成功！")
            console.log("json数据",response.data)
            that.form0 = response.data;
            this.form0 =this.storecostlist
          },function(response){
            alert("请求失败")
          })
        },    
  }
  }
</script>
<style>
    .el-input--small .el-input__inner{
        width:100px;
        text-align: center;
          font-size: 14px;
    }
</style>