<template>
	<div>
	 <el-collapse >
    <el-collapse-item title="员工薪水" name="1">
        <el-table :data="form0.staff" >
              <el-table-column align="center" label='工号' width="100" prop="id">
              </el-table-column>
              <el-table-column align="center" label='员工姓名' width="100" prop="name">
              </el-table-column>
              <el-table-column align="center" label="职位" width="" prop="job">             
              </el-table-column>
              <el-table-column align="center" label="基本工资/元" width="" prop="pay">            
              </el-table-column>
              <el-table-column align="center" label="加班费/元/月" width="" > 
                <template scope="scope">
                    <span v-if="editIndex !== scope.$index">{{ scope.row.overtime }}</span>
                    <el-input size="small" v-model="inputStaff.overtime" v-else></el-input>
                </template>
              </el-table-column>
              <el-table-column align="center" label="奖励/元/月" width="" > 
                <template scope="scope">
                    <span v-if="editIndex !== scope.$index">{{ scope.row.award }}</span>
                    <el-input size="small" v-model="inputStaff.award" v-else></el-input>
                </template>            
              </el-table-column>
                <el-table-column align="center"  label="操作" >
                    <template scope="scope">
                       <el-button  type="primary" @click="editStaff(scope.$index,scope.row)" size="small" icon="edit" v-if="editIndex !== scope.$index">编辑</el-button>
                       <el-button type="success" @click="finishStaff(scope.$index)" size="small" icon="check" v-else>完成</el-button>
                       <el-button icon="delete" size="small" type="dange-r" @click="Delete(scope.$index, scope.row)" >删除</el-button><!--  -->
                    </template>
                </el-table-column>
            </el-table> 
         
            <p>总支出：{{ totalstaff }}  </p>
      </el-collapse-item>
      
 	 </el-collapse >
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
          staff:[],
        },
      CostList:store.state.staffCost.staffCostState,
      storecostlist:store.state.cost.costlist,
        //折叠属性        
        activeNames: ['1'],
        //用来存储修改后的数据
        edit:{},
        //获取编辑下标
        editIndex:'',
        inputStaff:{
            overtime:"",
            award:""
          }
      };
    },
    mounted:function(){
      this.getData();
      this.add;
    },
    computed:{
        //计算员工工资
        totalstaff:function(){
            let staff=0;
            for(let i=0;i<this.form0.staff.length;i++){
                let p=this.form0.staff[i].pay;
                let p2=parseInt(p)
                let o=this.form0.staff[i].overtime;
                let o2=parseInt(o)
                let a=this.form0.staff[i].award;
                let a2=parseInt(a)
                staff+=p2+o2+a2;
                //console.log(this.form0.staff[i].pay)
            } 
            return staff
        },
    },
    methods:{
        //删除，数字代表第几行
        Delete(index,row){
            var that = this;
            console.log('单个删除选择的row：',index,'-----',row);
            that.form0.staff.splice(index,1)
        },
        //编辑员工
        editStaff(index,row){
          this.editIndex=index;
          this.inputStaff=JSON.parse(JSON.stringify(row))
        },
        // 编辑测试完成
        finishStaff(index){
            this.editIndex=null
            this.form0.staff[index].overtime=this.inputStaff.overtime
            this.form0.staff[index].award=this.inputStaff.award
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
            //根据工号获取人事管理的数据
            for(let i=0;i<this.form0.staff.length;i++){
                let Cid=this.form0.staff[i].id;
                //console.log("cid===",Cid)
                for(let j=0;j<this.CostList.length;j++){
                  let Sid=this.CostList[j].rs_id
                  if(Cid==Sid){
                    this.form0.staff[i].name=this.CostList[j].rs_name
                    this.form0.staff[i].job=this.CostList[j].rs_post
                    this.form0.staff[i].pay=this.CostList[j].rs_price
                    // console.log("name===",this.form0.staff[i].name)
                    // console.log("job===",this.form0.staff[i].job)
                    // console.log("pay===",this.form0.staff[i].pay)
                  }
                }
            }
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