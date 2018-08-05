<template>
    <div class="roles">
        <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">权限管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>角色列表</el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-button type="primary">添加角色</el-button>
       <el-table :data="roleList"  style="width: 100%">
            <el-table-column type="expand">
            <template slot-scope="scope">
               <el-row v-for="firstChildren in scope.row.children" :key="firstChildren.id">
                   <el-col :span='4'>
                       <el-tag  closable type="success">{{firstChildren.authName}}</el-tag> >
                    </el-col>
                   <el-col :span='20'>
                       <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                           <el-col :span='4'>
                                <el-tag  closable type="info">{{secondChildren.authName}}</el-tag> >
                           </el-col>
                           <el-col :span='20'>
                                <el-tag  v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id"  closable type="warning">{{thirdChildren.authName}}</el-tag>
                           </el-col>
                       </el-row>
                   </el-col>
               </el-row>
               <el-row v-if='scope.row.children.length === 0' class="rolesInfo" :span="24">该角色没有分配权限，请前往分配！</el-row>
            </template>
            </el-table-column>
            <el-table-column label="角色名称" prop="roleName">
            </el-table-column>
            <el-table-column label="描述" prop="roleDesc">
            </el-table-column>
            <el-table-column label="操作">
                <template slot-scope="scope">
                    <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
                    <el-button size="mini" type="success" icon="el-icon-check" @click="showGrantDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
</template>
<script>
import {getRoleList} from '@/api'
export default {
    data() {
      return {
        roleList: [],
      }
    },
    created() {
        this.initList()
    },
    methods: {
        // 获取角色列表数据
        initList() {
            getRoleList().then(res => {
                if(res.meta.status === 200) {
                    console.log(res)
                    this.roleList = res.data
                }
            })
        }
    }
  }
</script>
<style lang='scss' scoped>
.roles {
  .rolesInfo {
    font-size: 16px;
    color: red
  }
}


</style>


