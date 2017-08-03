<template>
<div>
<el-collapse >
	<el-collapse-item title="员工薪水" name="1">
	    <el-table :data="form0.staff" >
	          <el-table-column align="center" label='员工姓名' width="100" prop="name">

	          </el-table-column>

			  <el-table-column align="center" label="职位" width="" prop="job">
	            
	          </el-table-column>

	          <el-table-column align="center" label="基本工资/元" width="" prop="pay">
	           
	          </el-table-column>

	          <el-table-column align="center" label="加班费/元/月" width="" prop="overtime"> 

	          </el-table-column>

	          <el-table-column align="center" label="奖励/元/月" width="" prop="award">
	            
	          </el-table-column>

	            <el-table-column align="center"  label="操作" >
	                <template scope="staff">
	                   <el-button icon="edit" size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button><!--  -->
	                   <el-button icon="delete" size="small" type="danger" @click="Delete1(staff.$index, staff.row)" >删除</el-button><!--  -->
	                </template>
	            </el-table-column>
	    </el-table> 
			<el-dialog title="新增员工" :visible.sync="dialogFormVisible1">
			  <el-form :model="form1" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
			    <el-form-item label="员工姓名" >
			      <el-input v-model="form1.name" auto-complete="off"></el-input>
			    </el-form-item>
			    <el-form-item label="职位" >
			      <el-input v-model="form1.job" ></el-input>
			    </el-form-item>
			    <el-form-item label="基本工资">
	              <el-input v-model="form1.pay"></el-input>
	            </el-form-item>
			  </el-form>
			  <div slot="footer" class="dialog-footer">
			    <el-button @click="dialogFormVisible1 = false">取 消</el-button>
			    <el-button type="primary" @click="Submit1">确 定</el-button>
			  </div>
			</el-dialog>
		<el-button type="primary" icon="edit" @click="dialogFormVisible1 = true">新增员工</el-button>
		<p>总支出：{{ totalstaff }}  </p>
	</el-collapse-item>

	<el-collapse-item title="各大支出" name="2">
	    <el-table :data="form0.pay" >
	          <el-table-column align="center" label='开销' width="100" prop="thing">

	          </el-table-column>

			  <el-table-column align="center" label="金额(元/月) " width="" prop="money">
	            
	          </el-table-column>
				<el-table-column align="center"  label="操作" >
		                <template scope="pay">
		                   <el-button icon="edit" size="small" @click="handleEdit(pay.$index, pay.row)">编辑</el-button><!--  -->
		                   <el-button icon="delete" size="small" type="danger" @click="Delete2(pay.$index, pay.row)">删除</el-button><!--  -->
		                </template>
		    	</el-table-column>
	    </el-table> 
	    <el-dialog title="新增支出"  :visible.sync="dialogFormVisible2">
	          <el-form :model="form2" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

	            <el-form-item label="开销">
	              <el-input v-model="form2.thing"></el-input><!-- v-model="roleTemp.roleName" -->
	            </el-form-item>

	            <el-form-item label="金额">
	              <el-input v-model="form2.money"></el-input>
	            </el-form-item>

	          </el-form>

	          <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible2 = false">取 消</el-button>
	           
	            <el-button type="primary" @click="Submit2">确 定</el-button>
	          </div>
	    </el-dialog>
	  <el-button class="filter-item" type="primary" @click="dialogFormVisible2 = true" icon="edit" >新增支出</el-button>
	  <p>总支出：{{ totalpay }}  </p>
	</el-collapse-item>

	<el-collapse-item title="厨房用品" name="3">
	    <el-table :data="form0.kitchen" >
	        <el-table-column align="center" label='用品' width="100" prop="thing">
	        </el-table-column>

			<el-table-column align="center" label="数量" width="" prop="count">   
	        </el-table-column>

			<el-table-column align="center" label="单价" width="" prop="price">    
	        </el-table-column>
			  
			<el-table-column align="center" label="总额" width=""> 
	        </el-table-column>
			<el-table-column align="center"  label="操作" >
		        <template scope="kitchen">
		            <el-button icon="edit" size="small" @click="handleEdit(kitchen.$index, kitchen.row)">编辑</el-button><!--  -->
		            <el-button icon="delete" size="small" type="danger" @click="Delete3(kitchen.$index, kitchen.row)">删除</el-button><!--  -->
		        </template>
		    </el-table-column>
	    </el-table> 
	    <el-dialog title="新增用品"  :visible.sync="dialogFormVisible3">
	          <el-form :model="form3" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

	            <el-form-item label="用品">
	              <el-input v-model="form3.thing"></el-input><!-- v-model="roleTemp.roleName" -->
	            </el-form-item>

				<el-form-item label="数量">
	              <el-input v-model="form3.count"></el-input>
	            </el-form-item>

	            <el-form-item label="单价">
	              <el-input v-model="form3.price"></el-input>
	            </el-form-item>
				
				<el-form-item label="总额">
	              <el-input v-model="form3.money"></el-input>
	            </el-form-item>

	          </el-form>

	          <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible3 = false">取 消</el-button><!--  -->
	            <el-button type="primary" @click="Submit3">确 定</el-button>
	          </div>
	    </el-dialog>
	  		<el-button class="filter-item" type="primary" @click="dialogFormVisible3 = true" icon="edit" >新增用品</el-button>
            <p>总支出：{{ totalkitchen }}</p>
	</el-collapse-item>

	<el-collapse-item title="其他" name="4">
		<el-table :data="form0.other" >
	          <el-table-column align="center" label='其他' width="100" prop="thing">

	          </el-table-column>
			  
			  <el-table-column align="center" label="金额" width="" prop="money">
	            
	          </el-table-column>
			<el-table-column align="center"  label="操作" >
	                <template scope="other">
	                   <el-button icon="edit" size="small" @click="handleEdit(other.$index, other.row)">编辑</el-button><!--  -->
	                   <el-button icon="delete" size="small" type="danger" @click="Delete4(other.$index, other.row)">删除</el-button><!--  -->
	                </template>
	    	</el-table-column>
	    </el-table> 


	  	    <el-dialog title="新增其他" :visible.sync="dialogFormVisible4">
	          <el-form :model="form4" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>

	            <el-form-item label="其他">
	              <el-input v-model="form4.thing"></el-input><!-- v-model="roleTemp.roleName" -->
	            </el-form-item>
				
				<el-form-item label="金额">
	              <el-input v-model="form4.money"></el-input>
	            </el-form-item>

	          </el-form>

	          <div slot="footer" class="dialog-footer">
	            <el-button @click="dialogFormVisible4 = false">取 消</el-button><!--  -->
	           
	            <el-button type="primary" @click="Submit4">确 定</el-button>
	          </div>
	    </el-dialog>
	  <el-button class="filter-item" type="primary" @click="dialogFormVisible4 = true"  icon="edit" >新增其他</el-button>
      <p>总支出：{{ totalother }}</p>
	</el-collapse-item>
</el-collapse>
<p>本月总支出：{{ totalstaff+totalpay+totalkitchen+totalother }}</p>
</div>
</template>
<script>
  export default {
    data() {
      return {
      	form0:{ 
    		staff:[],
    		pay:[],
    		kitchen:[],
    		other:[]
			}, 
      	
        activeNames: ['1'],

        dialogTableVisible1: false,
        dialogFormVisible1: false,
        form1: {
          name: '',
          job: '',
          pay: ''
        },
        dialogTableVisible2: false,
        dialogFormVisible2: false,
        form2: {
          thing: '',
          money: ''
        },
        dialogTableVisible3: false,
        dialogFormVisible3: false,
        form3: {
          thing: '',
          count: '',
          price: '',
          money: ''
        },
        dialogTableVisible4: false,
        dialogFormVisible4: false,
        form4: {
          thing: '',
          money: ''
        },
      };
    },
    mounted:function(){
    	this.getData();
        this.add1();
    },
    computed:{
        totalstaff:function(){
            let staff=0;
            for(let i=0;i<this.form0.staff.length;i++){
                let p=this.form0.staff[i].pay;
                let p2=parseInt(p)
                staff+=p2;
                //console.log(this.form0.staff[i].pay)
            } 
            return staff
        },
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
        totalkitchen:function(){
            let kitchen=0;
            for(let i=0;i<this.form0.kitchen.length;i++){
                let k=this.form0.kitchen[i].money;
                let k2=parseInt(k)
                kitchen+=k2;
                //console.log(this.form0.staff[i].pay)
            } 
            return kitchen
        },
        add:function(){
            // let sum=0;
            for(let i=0;i<this.form0.kitchen.length;i++){
                let c=this.form0.kitchen[i].count;
                let p=this.form0.kitchen[i].price;
                var s=this.form0.kitchen[i].money;
                sum= c*p;
                s=sum;
                console.log(s)
                alert(sum)
            }
            return sum
        },
        totalother:function(){
            let other=0;
            for(let i=0;i<this.form0.other.length;i++){
                let o=this.form0.other[i].money;
                let o2=parseInt(o)
                other+=o2;
                //console.log(this.form0.staff[i].pay)
            } 
            return other
        }
    },
    methods:{

    Submit1(){
        var that = this;
        console.log('新增入参：',that.form1)

        that.form0.staff.push(that.form1)
        
        console.log('新增后',that.form1)
        
        that.dialogFormVisible1 = false;
        that.form1={
        	name: '',
          	job: '',
          	pay: ''
        }
    },
    Submit2(){
        var that = this;
        console.log('新增入参：',that.form2)

        that.form0.pay.push(that.form2)
        console.log('新增后',that.form2)
        
        that.dialogFormVisible2 = false;
        that.form2={
        	thing: '',
          	money: ''
        }
    },
    Submit3(){
        var that = this;
        console.log('新增入参：',that.form3)

        that.form0.kitchen.push(that.form3)
        console.log('新增后',that.form3)
        
        that.dialogFormVisible3 = false;
        that.form3={
        	thing: '',
          	count: '',
          	price: '',
          	money: ''
        }
    },
    Submit4(){
        var that = this;
        console.log('新增入参：',that.form4)

        that.form0.other.push(that.form4)
        console.log('新增后',that.form4)
        
        that.dialogFormVisible4 = false;
        that.form1={
        	thing: '',
          	money: ''
        }
    },
    //删除
    Delete1(index,row){
        var that = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        console.log()
        that.form0.staff.splice(index,1)
    },
    Delete2(index,row){
        var that = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        console.log()
        that.form0.pay.splice(index,1)
    },
    Delete3(index,row){
        var that = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        console.log()
        that.form0.kitchen.splice(index,1)
    },
    Delete4(index,row){
        var that = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        console.log()
        that.form0.other.splice(index,1)
    },

    getData:function(){
    	let that = this;
    	that.$http.get('../../static/Cost.json').then(
    	function(response){
    		console.log(response);
            // alert("请求成功！")
    		console.log("json数据",response.data)
    		that.form0 = response.data;
    	},function(response){
    		alert("请求失败")
    	})
    },
    

  }
  }
</script>