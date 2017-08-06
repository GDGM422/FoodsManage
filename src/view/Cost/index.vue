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
	                   <el-button icon="edit" size="small" @click="editStaff(staff.$index, staff.row)">编辑</el-button><!--  -->
	                   <el-button icon="delete" size="small" type="danger" @click="Delete1(staff.$index, staff.row)" >删除</el-button><!--  -->
	                </template>
	            </el-table-column>
	    </el-table> 
            <!-- 编辑弹框============================================================================= -->
            <el-dialog title="编辑员工" :visible.sync="editVisible1">
              <el-form :model="form1" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="员工姓名" >
                  <el-input v-model="edit1.name" auto-complete="off"></el-input>
                </el-form-item>
                <el-form-item label="职位" >
                  <el-input v-model="edit1.job" ></el-input>
                </el-form-item>
                <el-form-item label="基本工资">
                  <el-input v-model="edit1.pay"></el-input>
                </el-form-item>
                <el-form-item label="加班费">
                  <el-input v-model="edit1.overtime"></el-input>
                </el-form-item>
                <el-form-item label="奖励">
                  <el-input v-model="edit1.award"></el-input>
                </el-form-item>
              </el-form>
              <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible1 = false">取 消</el-button>
                <el-button type="primary" @click="editCommit1">确 定</el-button>
              </div>
            </el-dialog>
            <!-- 新增弹框=========================================================================== -->
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
		                   <el-button icon="edit" size="small" @click="editPay(pay.$index, pay.row)">编辑</el-button><!--  -->
		                   <el-button icon="delete" size="small" type="danger" @click="Delete2(pay.$index, pay.row)">删除</el-button><!--  -->
		                </template>
		    	</el-table-column>
	    </el-table> 
        <!-- 编辑弹框============================================================================ -->
        <el-dialog title="编辑支出"  :visible.sync="editVisible2">
              <el-form :model="form2" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="开销">
                  <el-input v-model="edit2.thing"></el-input>
                </el-form-item>
                <el-form-item label="金额">
                  <el-input v-model="edit2.money"></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible2 = false">取 消</el-button>               
                <el-button type="primary" @click="editCommit2">确 定</el-button>
              </div>
        </el-dialog>
        <!-- 新增弹框============================================================================== -->
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
			<el-table-column align="center" label="总额" width="" >
                <template scope="scope">
                   {{ scope.row.count * scope.row.price}}
                </template>
	        </el-table-column>
			<el-table-column align="center"  label="操作" >
		        <template scope="kitchen">
		            <el-button icon="edit" size="small" @click="editKitchen(kitchen.$index, kitchen.row)">编辑</el-button><!--  -->
		            <el-button icon="delete" size="small" type="danger" @click="Delete3(kitchen.$index, kitchen.row)">删除</el-button><!--  -->
		        </template>
		    </el-table-column>
	    </el-table> 
        <!-- 编辑弹框============================================================================ -->
        <el-dialog title="编辑用品"  :visible.sync="editVisible3">
              <el-form :model="form3" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>                
                <el-form-item label="用品">
                  <el-input v-model="edit3.thing"></el-input>
                </el-form-item>
                <el-form-item label="数量">
                  <el-input v-model="edit3.count"></el-input>
                </el-form-item>
                <el-form-item label="单价">
                  <el-input v-model="edit3.price"></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible3 = false">取 消</el-button><!--  -->
                <el-button type="primary" @click="editCommit3">确 定</el-button>
              </div>
        </el-dialog>
        <!-- 新增弹框==================================================================================== -->
	    <el-dialog title="新增用品"  :visible.sync="dialogFormVisible3">
	          <el-form :model="form3" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
	            <el-form-item label="用品">
	              <el-input v-model="form3.thing"></el-input><!--  -->
	            </el-form-item>
				<el-form-item label="数量">
	              <el-input v-model="form3.count"></el-input>
	            </el-form-item>
	            <el-form-item label="单价">
	              <el-input v-model="form3.price"></el-input>
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
	                   <el-button icon="edit" size="small" @click="editOther(other.$index,other.row)">编辑</el-button><!--  -->
	                   <el-button icon="delete" size="small" type="danger" @click="Delete4(other.$index, other.row)">删除</el-button><!--  -->
	                </template>
	    	</el-table-column>
	    </el-table> 
        <!--  编辑弹框====================================================================== -->
            <el-dialog title="其他" :visible.sync="editVisible4">
              <el-form :model="form4" class="small-space" label-position="left" label-width="70px" style='width: 400px; margin-left:50px;'>
                <el-form-item label="名称">
                  <el-input v-model="edit4.thing"></el-input><!-- v-model="roleTemp.roleName" -->
                </el-form-item>                
                <el-form-item label="金额">
                  <el-input v-model="edit4.money"></el-input>
                </el-form-item>
              </el-form>

              <div slot="footer" class="dialog-footer">
                <el-button @click="editVisible4 = false">取 消</el-button><!--  -->               
                <el-button type="primary" @click="editCommit4">确 定</el-button>
              </div>
            </el-dialog>
            <!--  新增弹框====================================================================== -->
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
    name: 'index',
    data() {
      return {
        //从json获取数据
      	form0:{ 
    		staff:[],
    		pay:[],
    		kitchen:[],
    		other:[]
			},
        //折叠属性       	
        activeNames: ['1'],
        //新增弹框条件
        dialogTableVisible1: false,
        dialogFormVisible1: false,
        //第一行
        form1: {
          name: '',
          job: '',
          pay: ''
        },
        dialogTableVisible2: false,
        dialogFormVisible2: false,
        //第二行
        form2: {
          thing: '',
          money: ''
        },
        dialogTableVisible3: false,
        dialogFormVisible3: false,
        //第三行
        form3: {
          thing: '',
          count: '',
          price: '',
          money: ''
        },
        dialogTableVisible4: false,
        dialogFormVisible4: false,
        //第四行
        form4: {
          thing: '',
          money: ''
        },
        //编辑弹框条件
        editVisible1:false,
        editVisible2:false,
        editVisible3:false,
        editVisible4:false,
        //用来存储修改后的数据
        edit1:{},
        edit2:{},
        edit3:{},
        edit4:{},
        //获取编辑下标
        editIndex:'',
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
                staff+=p2;
                //console.log(this.form0.staff[i].pay)
            } 
            return staff
        },
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
        //计算其他金额
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
        //第一行的新增
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
        //第二行的新增      
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
        //第三行的新增
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
        //第四行的新增
        Submit4(){
            var that = this;
            console.log('新增入参：',that.form4)
            that.form0.other.push(that.form4)
            console.log('新增后',that.form4)             
            that.dialogFormVisible4 = false;
            that.form4={
            	thing: '',
              	money: ''
            }
        },
        //删除，数字代表第几行
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
        //编辑员工
        editStaff(index,row){
            var that=this;
            that.editVisible1=true;
            that.edit1=row;            
            that.editIndex=index;
            console.log(index,row)            
        },
        //第一行的提交
        editCommit1(){
            var that=this;            
            that.form0.staff.splice(that.editIndex,1,that.edit1);
            console.log("添加",that.edit1);            
            that.editVisible1=false;
        },
        //编辑支出
        editPay(index,row){
            var that=this;
            that.editVisible2=true;
            that.edit2=row;
            that.editIndex=index;
            console.log(index,row)
        },
        //第二行的提交
        editCommit2(){
            var that=this;            
            that.form0.pay.splice(that.editIndex,1,that.edit2);
            console.log("添加",that.edit2);            
            that.editVisible2=false;
        },
        //编辑厨房用品
        editKitchen(index,row){
            var that=this;
            that.editVisible3=true;
            that.edit3=row;
            that.editIndex=index;
            console.log(index,row)
        },
        //第三行的提交
        editCommit3(){
            var that=this;            
            that.form0.kitchen.splice(that.editIndex,1,that.edit3);
            console.log("添加",that.edit3);            
            that.editVisible3=false;
        },
        //编辑其他
        editOther(index,row){
            var that=this;
            that.editVisible4=true;
            that.edit4=row;
            that.editIndex=index;
            console.log(index,row)
        },
        //第四行的提交
        editCommit4(){
            var that=this;            
            that.form0.other.splice(that.editIndex,1,that.edit4);
            console.log("添加",that.edit4);            
            that.editVisible4=false;
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
        	},function(response){
        		alert("请求失败")
        	})
        },    
  }
  }
</script>