<template>
	<div>
	<el-collapse >
				  <el-collapse-item title="厨房用品" name="3">
		      <el-table :data="form0.kitchen" >
		          <el-table-column align="center" label='用品' width="" >
		              <template scope="scope">
		                  <span v-if="editIndex !== scope.$index">{{ scope.row.thing }}</span>
		                  <el-input  size="small" v-model="scope.row.thing" v-else></el-input>
		              </template> 
		          </el-table-column>
		          <el-table-column align="center" label="数量" width=""> 
		              <template scope="scope">
		                  <span v-if="editIndex !== scope.$index">{{ scope.row.count }}</span>
		                  <el-input  size="small" v-model="inputKitchen.count" v-else></el-input>
		              </template>   
		          </el-table-column>
		          <el-table-column align="center" label="单价" width="">
		              <template scope="scope">
		                  <span v-if="editIndex !== scope.$index">{{ scope.row.price }}</span>
		                  <el-input  size="small" v-model="inputKitchen.price" v-else></el-input>
		              </template>     
		          </el-table-column>
		          <el-table-column align="center" label="总额" width="" >
		                <template scope="scope">
		                   {{ scope.row.count * scope.row.price}}
		                </template>
		          </el-table-column>
		      <el-table-column align="center"  label="操作" >
		            <template scope="scope">
		                <el-button  type="primary" @click="editKitchen(scope.$index,scope.row)" size="small" icon="edit" v-if="editIndex !== scope.$index">编辑</el-button>
		                <el-button type="success" @click="finishKitchen(scope.$index)" size="small" icon="check" v-else>完成</el-button>
		                <el-button icon="delete" size="small" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
		            </template>
		        </el-table-column>
		      </el-table> 
		        
		        <!-- 新增弹框==================================================================================== -->
		      <el-dialog title="新增用品"  :visible.sync="dialogFormVisible" :modal-append-to-body="false">
		            <el-form :model="form" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
		              <el-form-item label="用品">
		                <el-input v-model="form.thing"></el-input><!--  -->
		              </el-form-item>
		        <el-form-item label="数量">
		                <el-input v-model="form.count"></el-input>
		              </el-form-item>
		              <el-form-item label="单价">
		                <el-input v-model="form.price"></el-input>
		              </el-form-item>
		            </el-form>

		            <div slot="footer" class="dialog-footer">
		              <el-button @click="dialogFormVisible = false">取 消</el-button><!--  -->
		              <el-button :plain="true" type="primary" @click="Submit">确 定</el-button>
		            </div>
		      </el-dialog>
		        <el-button class="filter-item" type="primary" @click="dialogFormVisible = true" icon="edit" >新增用品</el-button>
		            <p>总支出：{{ totalkitchen }}  </p>
		  </el-collapse-item>
		</el-collapse>
	</div>
</template>

<script>
import store from '../../store/index'
import { api } from '../../global/api'
  export default {
    name: 'index',
    data() {
      return {
        //从json获取数据
      	form0:{ 
        	kitchen:[],
		},
      storecostlist:store.state.cost.costlist,
        //折叠属性       	
        activeNames: ['1'],
        //新增弹框条件
        dialogFormVisible: false,
        //第三行
        form: {
          thing: '',
          count: '',
          price: '',
          money: ''
        },
        //用来存储修改后的数据
        edit:{},
        //获取编辑下标
        editIndex:'',
        //编辑input
        inputKitchen:{
            thing:"",
            count:"",
            price:"",
            money:""
        },
        
      };
    },    
    mounted:function(){
    	this.getData();
        this.add;      
    },
    computed:{
        //计算厨房用品金额
        totalkitchen:function(){
            let kitchen=0;
            let kitchenAll=0;
            for(let i=0;i<this.form0.kitchen.length;i++){
                let k=this.form0.kitchen[i].count;
                let k1=this.form0.kitchen[i].price;
                /*let k2=parseInt(k)*/
                kitchen=k*k1;
                kitchenAll+=kitchen;
                //console.log(this.form0.staff[i].pay)
            } 
            return kitchenAll
        },
        //计算厨房用品单价*数量
        add:function(){
            let sum=0;
            for(let i=0;i<this.form0.kitchen.length;i++){
                let c=this.form0.kitchen[i].count;
                let p=this.form0.kitchen[i].price;
                var s=this.form0.kitchen[i].money;
                sum= c*p;
                s=sum;
            }
            return s
        },

    },
    methods:{ 
        //第三行的新增
        Submit(){
            var that = this;
            if(that.form.price==''||that.form.count==''||isNaN(that.form.count)||isNaN(that.form.price)){
                that.$message.error("新增失败！")
                that.dialogFormVisible = false;
                return
            }else{
                console.log('新增入参：',that.form)
                that.form0.kitchen.push(that.form)
                console.log('新增后',that.form)            
                that.dialogFormVisible = false;
                that.form={
                	thing: '',
                  	count: '',
                  	price: '',
                  	money: ''
                }
            }
        },
        Delete(index,row){
            var that = this;
            console.log('单个删除选择的row：',index,'-----',row);
            that.form0.kitchen.splice(index,1)
        },
        //编辑厨房
        editKitchen(index,row){
          this.editIndex=index;
          this.inputKitchen=JSON.parse(JSON.stringify(row))
        },
        // 编辑测试完成
        finishKitchen(index){
            this.editIndex=null
            this.form0.kitchen[index].thing=this.inputKitchen.thing
            this.form0.kitchen[index].count=this.inputKitchen.count
            this.form0.kitchen[index].price=this.inputKitchen.price
            this.form0.kitchen[index].money=this.inputKitchen.money
            },
        //获取json
        getData:function(){
        	let that = this;
        	that.$http.get(api.Cost).then(
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