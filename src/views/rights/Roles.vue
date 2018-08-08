<template>
    <div class="roles">
        <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">权限管理</a></el-breadcrumb-item>
                <el-breadcrumb-item><span class="currentpage">角色列表</span></el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-button type="primary" @click='addNewRoles'>添加角色</el-button>
       <el-table :data="roleList"  style="width: 100%" v-loading='loading'>
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
                    <el-button size="mini" type="primary" icon="el-icon-edit" disabled></el-button>
                    <el-button size="mini" type="danger" icon="el-icon-delete" disabled></el-button>
                    <el-button size="mini" type="success" icon="el-icon-check" @click="showDialog(scope.row)"></el-button>
                </template>
            </el-table-column>
        </el-table>
        <!-- 添加角色对话框 -->
        <el-dialog title="添加角色" :visible.sync="addRolesDialogFormVisible">
            <el-form :model="addRolesForm" ref="addFormRoles" :rules='rules' >
                <el-form-item label="角色名称" prop='roleName'>
                    <el-input v-model="addRolesForm.roleName" auto-complete="off"></el-input>
                </el-form-item>
                 <el-form-item label="角色描述" prop='roleDesc'>
                    <el-input v-model="addRolesForm.roleDesc" auto-complete="off"></el-input>
                </el-form-item>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="addRolesDialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="addRolesSubmit">确 定</el-button>
            </div>
        </el-dialog>
        <!-- 添加权限对话框 -->
        <el-dialog title="添加权限" :visible.sync="dialogFormVisible">
            <div class="tree-container">
                <el-tree :data="rightList" show-checkbox node-key="id" 
                :default-expand-all=true ref='tree'
                :default-checked-keys="selectedRights"
                :props="defaultProps">
              </el-tree>
            </div> 
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogFormVisible = false">取 消</el-button>
                <el-button type="primary" @click="submitGrant">确 定</el-button>
            </div>
        </el-dialog>
      
    </div>
</template>
<script>
import {getRoleList, deleteRight, getRightList, grantRoleRight, addRoles} from '@/api'
export default {
    data() {
      return {
        loading: true,
        roleList: [],
        addRolesDialogFormVisible: false,
        addRolesForm: {
            roleName: '',
            roleDesc: ''
        },
        rules: {
            roleName: [
            { required: true, message: '请输入角色名称', trigger: 'blur'  }
          ]
        },
        dialogFormVisible: false,
        rightList: [], 
        selectedRights: [],// 保存默认选中的
        currentRole: [], // 保存勾选中的
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
                    this.loading = false
                }
            })
        },
        // 显示添加角色对话框
        addNewRoles() {
            this.addRolesDialogFormVisible = true
           
        },
        // 确定添加角色
        addRolesSubmit() {
             this.$refs.addFormRoles.validate((valid) => {
                if (valid) {
                    addRoles({roleName: this.addRolesForm.roleName, roleDesc: this.addRolesForm.roleDesc}).then(res => {
                        console.log(res)
                        if (res.meta.status === 201) {
                            this.$message({
                                type: 'success',
                                message: '添加成功'
                            })
                            this.addRolesDialogFormVisible = false
                            this.initList()
                        } else {
                            this.$message({
                                type: 'error',
                                message: res.meta.msg
                            })
                        }
                    })
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
        // 显示权限树形框
        showDialog(row) {
            this.dialogFormVisible = true
            this.currentRole = row
            getRightList({type: 'tree'}).then(res => {
                if (res.meta.status === 200) {
                    this.rightList = res.data
                } else {
                    this.$message({
                        type: 'error',
                        message: res.meta.message
                    })
                }
            });
            // 遍历之前先清空数组
            this.selectedRights.length = 0
            // 取出当前角色权限,遍历到他的第三个children,取出所对应的id放在定义好的配置项中
            this.currentRole.children.forEach(first => {
                if(first.children && first.children.length !== 0) {
                    first.children.forEach(second => {
                        if(second.children && second.children.length !== 0) {
                            second.children.forEach(third => {
                                this.selectedRights.push(third.id)
                            })
                        }
                    })
                }
            })   
        },
        // 提交授权
        submitGrant() {
            let nodeArr = this.$refs.tree.getCheckedNodes()
            let rids = []
            nodeArr.forEach(item => {
                rids.push(item.id + ',' + item.pid)
            })
            let newArr = rids.join(',').split(',');
            let idArr =[...new Set(newArr)];
            grantRoleRight(this.currentRole.id, {rids: idArr.join(',')}).then(res => {
                if (res.meta.status === 200) {
                    this.$message({
                        type: 'success',
                        message: '设置权限成功'
                    })
                    this.initList()
                    this.dialogFormVisible = false
                } else {
                    this.$message({
                        type: 'error',
                        message: res.meta.msg
                    })
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


