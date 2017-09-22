<template>
  <div class="app-container">
    <h2 style="color:red">
        注意：此页面使用了本地api接口，若想正常运行，请下载另外一个node项目（https://github.com/Anni4031/node_books），并且在本地启动该node项目。
    </h2>
    
    <!-- 搜索条件 -->
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="图书名称" v-model="listQuery.bookName">
      </el-input>
 
      <el-select clearable class="filter-item" style="width: 130px" v-model="listQuery.bookType" placeholder="图书类型">
        <el-option v-for="item in  typeOptions" :key="item.key" :label="item.display_name" :value="item.key">
        </el-option>
      </el-select>

      <el-button class="filter-item" type="primary" v-waves icon="search" @click="handleFilter">搜索</el-button>
      <el-button class="filter-item" type="primary" @click="handleCreate"  icon="edit">添加</el-button>
      <el-button class="filter-item" type="primary" @click="handleDelAll"  icon="edit">批量删除</el-button>
    </div>
   
    <!-- 表格 -->
    <el-table ref="multipleTable" @selection-change="handleSelectionChange" :data="list" border style="width: 100%" ><!-- v-loading.body="listLoading" element-loading-text="拼命加载中"  -->
         <el-table-column type="selection" width="65">
         </el-table-column>

          <el-table-column align="center" label='序号' width="">
            <template scope="scope">
              {{scope.$index}}
            </template>
          </el-table-column>

          <el-table-column label="图书名称" width="">
            <template scope="scope">
              {{scope.row.bookName}}
            </template>
          </el-table-column>

          <el-table-column label="图书类别" width="" align="center">
            <template scope="scope">
              <span v-if="scope.row.bookType == 'Youth' ">青春文学</span>
              <span v-if="scope.row.bookType == 'Science' ">科普读物</span>
              <span v-if="scope.row.bookType == 'Life' ">生活</span>
              <span v-if="scope.row.bookType == 'Magazine' ">杂志</span>
            </template>
          </el-table-column>

          <el-table-column label="图书作者"  align="center" width="">
            <template scope="scope">
              {{scope.row.bookAuthor}} 
            </template>
          </el-table-column>

          <el-table-column align="center" prop="pressName" label="出版社名称" width="">
            <template scope="scope">
              {{scope.row.pressName}}
            </template>
          </el-table-column>

            <el-table-column align="center"  label="出版日期" >
                <template scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>{{scope.row.publicDate}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="登记日期" >
                <template scope="scope">
                  <!-- <i class="el-icon-time"></i> -->
                  <span>{{scope.row.recordDate}}</span>
                </template>
            </el-table-column>

            <el-table-column align="center"  label="操作" >
                <template scope="scope">
                    
                   <el-button size="small" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                   <el-button size="small" type="danger" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
                         
                </template>
            </el-table-column>
    </el-table>
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
import Vue from 'vue'
import { api } from '../../global/api'
export default {
  data() {
    return {
        list: null,//表格list [].push({})
        total: null,
        listLoading: true,
        listQuery: {
            // importance: undefined,
            bookName: '',
            bookType: null,//类型     
        },
        typeOptions:[
          { key: 'Youth', display_name: '青春文学' },
          { key: 'Science', display_name: '科普读物' },
          { key: 'Life', display_name: '生活' },
          { key: 'Magazine', display_name: '杂志' }   
        ],
        multipleSelection: [],
        //分页
        page:{
          currPage:1,
          pageSize:10
        },

    }
  },
  mounted:function(){
    this.getList();
  },
  methods: {
    //获取图书列表数据
    getList() {
        let vm = this;
        console.log("aaaa")
        Vue.http.get(api.booksList,{params: vm.listQuery },function(res){
                console.log('-------获取到数据：',JSON.stringify(res) )
                let data = res.body;
               if(data.resultCode == 0){ 
                    vm.list = data.data.data;
                    console.log('图书列表数据：',vm.list);
                    vm.total = data.data.total;       
               }else{
                    this.$message({
                        showClose: true,
                        message: res.body.resultMsg,
                        type: 'error'
                    })
               }      
        },function(res){
            console.log("图书列表请求数据失败!")
        },false)
    },
    // 编辑
    handleEdit(index,row){
        let vm = this;
        console.log('编辑的row：',index,'-----',row);
        //跳页面进行修改
        this.$router.push( { path: '/booksManage/bookUpdate', query: { id: row._id } } ); //带参跳转
    },

    // 单个删除
    handleDelete(index,row){
        let vm = this;
        console.log('单个删除选择的row：',index,'-----',row);
        //前端删除。
        // vm.list.splice(index,1)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
          vm.delFun(row);
            this.$message({
              type: 'success',
              message: '删除成功!'
            });


        }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
        });     

    },
    // 调取删除接口的删除方法
    delFun(row){
      let vm = this;
      this.$http.get( api.delBooks,{params: {'id':row['_id']} },function(res){
            vm.getList();      
      },function(res){
          alert('删除报错')
      },false)
    },
    //批量删除
    handleDelAll(){
        let vm = this;
        console.log('批量删除选择的row：',vm.multipleSelection)
        this.$confirm('此操作将永久删除该数据, 是否继续?', '提示', {
            confirmButtonText: '确定批量删除',
            cancelButtonText: '取消',
            type: 'warning'
        }).then(() => {
            //前端依次执行单个删除操作
            for (var index in vm.multipleSelection) {
                console.log('======',vm.multipleSelection[index])
                vm.delFun(vm.multipleSelection[index]);
            };
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
        }).catch(() => {
            // this.$message({
            //   type: 'info',
            //   message: '已取消删除'
            // });          
        });
    },
    handleSelectionChange(val) {
        this.multipleSelection = val;
    },
    //搜索
    handleFilter() {
      this.getList();
    },
    // //操作分页
    // handleSizeChange(val) {
    //   this.listQuery.pageSize = val;
    //   this.getList();
    // },
    // //操作分页
    // handleCurrentChange(val) {
    //     console.log('--------',val)
    //   this.listQuery.currPage = val;
    //   this.getList();
    // },
    //新增
    handleCreate() {
        //每次点击新增时 重置下新增表单数据，避免双向绑定的影响
        // this.initTemp();
        // this.dialogFormVisible = true;
        //跳到新增页面
        this.$router.push('/booksManage/bookAdd')
    },
    //新增提交
    // handleCreateSubmit(){
    //     let vm = this;
    //     console.log('新增入参：',vm.temp)
    //     //这里作演示用，正式新增 请提交到接口
    //     vm.list.push(vm.temp)
    //     console.log('新增后',vm.list)
        
    //     this.dialogFormVisible = false;
    // },
  }
};
</script>
