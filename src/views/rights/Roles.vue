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
                       <el-tag  closable @close="deleteRight(scope.row, firstChildren.id)" type="success">{{firstChildren.authName}}</el-tag> >
                    </el-col>
                   <el-col :span='20'>
                       <el-row v-for="secondChildren in firstChildren.children" :key="secondChildren.id">
                           <el-col :span='4'>
                                <el-tag  closable @close="deleteRight(scope.row, secondChildren.id)" type="info">{{secondChildren.authName}}</el-tag> >
                           </el-col>
                           <el-col :span='20'>
                                <el-tag closable @close="deleteRight(scope.row, thirdChildren.id)"  v-for="thirdChildren in secondChildren.children" :key="thirdChildren.id"   type="warning">{{thirdChildren.authName}}</el-tag>
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
                    <el-button size="mini" type="primary" icon="el-icon-edit" ></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" ></el-button>
                    <el-button size="mini" type="success" icon="el-icon-check" @click="showDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加权限对话框 -->
        <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
            <div class="tree-container">
                <el-tree :data="rightList" show-checkbox node-key="id" 
                :default-expand-all=true 
                :default-checked-keys="[5]"
                :props="defaultProps">
              </el-tree>
            </div> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="dialogFormVisible = false">确 定</el-button>
            </div>
        </el-dialog>
      
    </div>
</template>
<script>
import {getRoleList, deleteRight, getRightList} from '@/api'
export default {
    data() {
      return {
        roleList: [],
        dialogFormVisible: false,
        rightList: [],
        defaultProps: {
            children: 'children',
            label: 'authName'
        }
      }
    },
    created() {
        this.initList()
    },
    methods: {
        // 获取角色列表数据
        initList() {
            getRoleList().then(res => {
                if (res.meta.status === 200) {
                    this.roleList = res.data
                }
            })
        },
        // 删除角色指定权限
        deleteRight(row, rightId) {
            deleteRight({roleId: row.id, rightId: rightId}).then(res => {
               if (res.meta.status === 200) {
                   this.$message({
                       type: 'success',
                       message: res.meta.msg
                   })
                   this.initList()
               } else {
                   this.$message({
                       type: 'error',
                       message: res.meta.msg
                   })
               }
            })

        },
        // 显示添加权限弹出框
        showDialog(row) {
            this.dialogFormVisible = true
            getRightList({type: 'tree'}).then(res => {
                this.rightList = res.data
                console.log(this.rightList)
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


