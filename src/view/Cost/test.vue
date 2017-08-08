<template>
<div>
	<!-- 测试区============================================================================================ -->
<el-collapse >
  <!-- 把绑定都移到template中 -->
  <el-collapse-item title="测试项" name="5">
    <el-table :data="form0.test">  
            <el-table-column align="center" label='其他' width="100" > <!-- prop="thing" -->
            <!-- 这里开始是移除了prop而添加的templa================================== -->
              <template scope="test"> 
                <span>{{test.row.thing}}<i class="fs iconfont icon-accessory"></i></span>
              </template> 
            <!-- 结束============================ -->
            </el-table-column>        
            <el-table-column align="center" label="金额" width="" >
            <!-- 添加了template============================== -->
                <!-- <template scope="scope">
                  <el-input v-show="scope.row.edit" size="small" v-model="scope.row.money" ></el-input>
                  <span v-show="!scope.row.edit" >{{ scope.row.money }}</span>
                </template> -->
            <!-- 操作完毕============================== -->
        <!-- 这是v-if编辑的板子==================================================================== -->
            <template scope="test">
                  <span v-if="editIndex !== test.$index">{{ test.row.money }}</span>
                  <el-input size="small" v-model="inputTest.money" v-else></el-input>
            </template>  
        <!-- 结束板子=============================================================================== -->
            </el-table-column>
            <el-table-column align="center"  label="操作" >
                <!-- 删除了自己的编辑按钮，使用它写的====== -->
                  <template scope="test">
                  <!-- <el-button v-show='!scope.row.edit' type="primary" v-on:click="scope.row.edit=true" size="small" icon="edit">编辑</el-button>
                  <el-button v-show='scope.row.edit' type="success" @click="scope.row.edit=false" size="small" icon="check">完成</el-button> -->
                <!-- 操作完毕============================== -->
        <!-- 这是v-if编辑的板子==================================================================== -->
            <el-button  type="primary" @click="editTest(test.$index,test.row)" size="small" icon="edit" v-if="editIndex !== test.$index">编辑</el-button>
            <el-button type="success" @click="finishTest(test.$index)" size="small" icon="check" v-else>完成</el-button>
         <!-- 结束板子=============================================================================== -->
                     <el-button icon="delete" size="small" type="danger" @click="Delete(test.$index, test.row)">删除</el-button>
                  </template>
            </el-table-column>
    </el-table> 
        <!-- 新增弹框==================================================================== -->
          <el-dialog title="新增其他" :visible.sync="dialogFormVisible">
            <el-form :model="form5" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
              <el-form-item label="其他">
                <el-input v-model="form5.thing"></el-input><!-- v-model="roleTemp.roleName" -->
              </el-form-item>       
        <el-form-item label="金额">
                <el-input v-model="form5.money"></el-input>
              </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button><!--  -->            
              <el-button :plain="true" type="primary" @click="Submit">确 定</el-button>
            </div>
      </el-dialog>
       <!--  新增弹框结束====================================================================== -->
    <el-button class="filter-item" type="primary" @click="dialogFormVisible = true"  icon="edit" >新增其他</el-button>
      <p>总支出：{{ totaltest }}</p>
  </el-collapse-item>
			<!-- 测试区============================================================================================ -->
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
	            test:[]  
			},
	        storecostlist:store.state.cost.costlist,
	        //折叠属性       	
	        activeNames: ['1'],
	        //新增弹框条件
	        //测试弹框
	        dialogFormVisible: false,
	        form5: {
	          thing: '',
	          money: ''
	        },
	        //获取编辑下标
	        editIndex:'',
	        //编辑input
	        inputTest:{
	          money:""
	        }
	      };
	    },
	    mounted:function(){
	    	this.getData();
	        this.add;
	    },
	    computed:{
	        totaltest:function(){
	            let test=0;
	            for(let i=0;i<this.form0.test.length;i++){
	                let t=this.form0.test[i].money;
	                let t2=parseInt(t)
	                test+=t2;
	            } 
	            return test
	        },
	    },
	    methods:{
	        //测试新增
	        Submit(){
	        	var that = this;
	            if(that.form5.money==''||isNaN(that.form5.money)){             
	            	that.$message.error("新增失败！")
	            	that.dialogFormVisible = false;
	            	return
	            }else{
	            	console.log('新增入参：',that.form5)
	            	that.form0.test.push(that.form5)
	            	console.log('新增后',that.form5)
	            	that.dialogFormVisible = false;
	            	that.form5={
	              		thing: '',
	              		money: ''
	            	}
	            }
	        	that.form5={
	              thing: '',
	              money: ''
	            }
	            	
            	console.log('新增入参：',that.form5)
            	that.form0.test.push(that.form5)
            	console.log('新增后',that.form5)             
            	that.dialogFormVisible = false;
	            
	        },
	        //测试删除
	        Delete(index,row){
	            var that = this;
	            console.log('单个删除选择的row：',index,'-----',row);
	            that.form0.test.splice(index,1)
	        },
	        //编辑测试
	        editTest(index,row){
	          this.editIndex=index;
	          this.inputTest=JSON.parse(JSON.stringify(row))
	          console.log(this.inputTest)
	        },
	        // 编辑测试完成
	        finishTest(index){
	          this.editIndex=null
	          this.form0.test[index].money=this.inputTest.money
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