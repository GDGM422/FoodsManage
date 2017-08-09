<template>
  <div>
  <el-collapse>  
  <el-collapse-item title="其他" name="4">
    <el-table :data="form0.other" >
            <el-table-column align="center" label='其他' width="300">
              <template scope="scope">
                  <span v-if="editIndex !== scope.$index">{{ scope.row.thing }}</span>
                  <el-input  size="small" v-model="scope.row.thing" v-else></el-input>
              </template> 
            </el-table-column>        
            <el-table-column align="center" label="金额" width="300" >
              <template scope="scope">
                  <span v-if="editIndex !== scope.$index">{{ scope.row.money }}</span>
                  <el-input  size="small" v-model="inputOther.money" v-else></el-input>
              </template>  
            </el-table-column>
      <el-table-column align="center"  label="操作" >
                  <template scope="scope">
                      <el-button  type="primary" @click="editOther(scope.$index,scope.row)" size="small" icon="edit" v-if="editIndex !== scope.$index">编辑</el-button>
                      <el-button type="success" @click="finishOther(scope.$index)" size="small" icon="check" v-else>完成</el-button>
                     <el-button icon="delete" size="small" type="danger" @click="Delete(scope.$index, scope.row)">删除</el-button>
                  </template>
        </el-table-column>
      </el-table> 
        
            <!--  新增弹框====================================================================== -->
          <el-dialog title="新增其他" :visible.sync="dialogFormVisible">
            <el-form :model="form" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
              <el-form-item label="其他">
                <el-input v-model="form.thing"></el-input><!-- v-model="roleTemp.roleName" -->
              </el-form-item>       
        <el-form-item label="金额">
                <el-input v-model="form.money"></el-input>
              </el-form-item>
            </el-form>

            <div slot="footer" class="dialog-footer">
              <el-button @click="dialogFormVisible = false">取 消</el-button><!--  -->            
              <el-button :plain="true" type="primary" @click="Submit">确 定</el-button>
            </div>
      </el-dialog>
    <el-button class="filter-item" type="primary" @click="dialogFormVisible = true"  icon="edit" >新增其他</el-button>
      <p>总支出：{{ totalother }}</p>
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
            other:[],
       },
      storecostlist:store.state.cost.costlist,
        //折叠属性        
        activeNames: ['1'],
        //新增弹框条件
        dialogFormVisible: false,
        //第四行
        form: {
          thing: '',
          money: ''
        },
        //用来存储修改后的数据
        edit:{},
        //获取编辑下标
        editIndex:'',
        //编辑input
        inputOther:{
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
        //计算其他金额
        totalother:function(){
            let other=0;
            for(let i=0;i<this.form0.other.length;i++){
                let o=this.form0.other[i].money;
                let o2=parseInt(o)
                other+=o2;
            } 
            return other
        }, 
    },
    methods:{
        //第四行的新增
        Submit(){
            var that = this;
            if(that.form.money==''||that.form.thing==''||isNaN(that.form.money)){
                that.$message.error("新增失败！")
                that.dialogFormVisible = false;
                return
            }else{
                console.log('新增入参：',that.form)
                that.form0.other.push(that.form)
                console.log('新增后',that.form)             
                that.dialogFormVisible = false;
                that.form={
                  thing: '',
                    money: ''
                }
            }
        },
        Delete(index,row){
            var that = this;
            console.log('单个删除选择的row：',index,'-----',row);
            that.form0.other.splice(index,1)
        },
        //编辑其他
        editOther(index,row){
          this.editIndex=index;
          this.inputOther=JSON.parse(JSON.stringify(row))          
        },
        // 编辑测试完成
          finishOther(index){
          this.editIndex=null
          this.form0.other[index].thing=this.inputOther.thing
          this.form0.other[index].money=this.inputOther.money          
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