<template>
    <div class="user">
       <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">用户管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>用户列表</el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span='24'>
               <el-input placeholder="请输入内容"  class="input-with-select search-input">
                   <el-button slot="append" icon="el-icon-search"></el-button>                   
               </el-input>
               <el-button type="success" plain>添加用户</el-button>
           </el-col>
       </el-row>
       <el-table
        :data="userList"
        border
        style="width: 100%">
            <el-table-column
            prop="username"
            label="姓名"
            width="180">
            </el-table-column>
            <el-table-column
            prop="email"
            label="邮箱"
            width="180">
            </el-table-column>
            <el-table-column
            prop="modil"
            label="电话"
            width="180">
            </el-table-column>
            <el-table-column label="用户状态">
                 
            </el-table-column>
            <el-table-column label="操作">
                 
            </el-table-column>
      </el-table>
      <el-row>
          <el-col :span="24">
              <el-pagination
                class="page"
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                :current-page="1"
                :page-sizes="[100, 200, 300, 400]"
                :page-size="100"
                layout="total, sizes, prev, pager, next, jumper"
                :total="400">
              </el-pagination>
          </el-col>
      </el-row>
    </div>
</template>
<script>
export default {
    data() {
      return {
        userList: [],
        value3: true
      }
    },
    methods: {
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
      }
    }
  }
</script>
<style lang="scss" scoped>
.user {
  .search-input {
    width: 300px;
  
  }
  .page {
    padding: 5px 0;
    background-color: #D3DCE6;
  }
}
</style>
