<template>
    <div class="user">
       <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">用户管理</a></el-breadcrumb-item>
                <el-breadcrumb-item><span class="currentpage">用户列表</span></el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-row>
           <el-col :span='24'>
               <el-input placeholder="请输入内容"  class="input-with-select search-input" v-model='query' @keydown.native.enter='initList'>
                   <el-button slot="append" icon="el-icon-search" @click='initList'></el-button>                   
               </el-input>
               <el-button type="success" plain @click="addDialogFormVisible=true">添加用户</el-button>
           </el-col>
       </el-row>
       <el-table :data="userList" border v-loading='loading' style="width: 100%">
        <el-table-column prop="username" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="email" label="邮箱" width="180">
        </el-table-column>
        <el-table-column prop="mobile" label="电话" width="180">
        </el-table-column>
        <el-table-column label="用户状态">
                <template slot-scope="scope">
                <el-switch v-model="scope.row.mg_state" @change ='changeUserState(scope.row)'>
                </el-switch>
            </template>
        </el-table-column>
        <el-table-column label="操作">
                <template slot-scope="scope">
                <el-button size="mini" type="primary" icon="el-icon-edit" @click="showEditDialog(scope.row)"></el-button>
                <el-button size="mini" type="danger" icon="el-icon-delete" @click="deleteUser(scope.row)"></el-button>
                <el-button size="mini" type="success" icon="el-icon-check" @click="showGrantDialog(scope.row)"></el-button>
            </template>
        </el-table-column>
      </el-table>
       <dir class="page">
           <el-pagination  @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1"
            :page-sizes="[1, 2, 3, 4]" :page-size="4" layout="total, sizes, prev, pager, next, jumper"
            :total="total">
            </el-pagination>
        </dir> 
        <!-- 添加用户对话框   -->
       <el-dialog title="添加用户" :visible.sync="addDialogFormVisible">
        <el-form :model="addForm" :label-width="formLabelWidth" ref="addUserForm" :rules="rules">
            <el-form-item label="用户名" prop="username" >
                <el-input v-model="addForm.username" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="密码" prop="password">
                <el-input v-model="addForm.password" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" prop="email">
                <el-input v-model="addForm.email" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="电话" prop="mobile">
                <el-input v-model="addForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="addDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="addUserSubmit">确 定</el-button>
        </div>
       </el-dialog>
       <!-- 编辑用户对话框 -->
       <el-dialog title="编辑用户" :visible.sync="editDialogFormVisible">
        <el-form :model="editForm" :label-width="formLabelWidth" ref="editUserForm" :rules="rules" >
            <el-form-item label="用户名" prop="username" >
                <el-input v-model="editForm.username" auto-complete="off" :disabled="true"></el-input>
            </el-form-item>
             <el-form-item label="邮箱" prop="email">
                <el-input v-model="editForm.email" auto-complete="off"></el-input>
            </el-form-item>
             <el-form-item label="电话" prop="mobile">
                <el-input v-model="editForm.mobile" auto-complete="off"></el-input>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="editDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="editUserSubmit">确 定</el-button>
        </div>
       </el-dialog>
       <!-- 分配角色对话框 -->
        <el-dialog title="分配角色" :visible.sync="grantDialogFormVisible">
        <el-form :model="grantForm" label-width="120px" >
            <el-form-item label="当前用户" prop="username" >
                  <el-tag type="info">{{grantForm.username}}</el-tag>
            </el-form-item>
            <el-form-item  label="请选择角色">
                <el-select v-model='roleId' placeholder="请选择角色">
                    <el-option v-for= "(role,index) in roleList" :key='index' :value="role.id" :label="role.roleName" >                        
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
            <el-button @click="grantDialogFormVisible = false">取 消</el-button>
            <el-button type="primary" @click="grantUserSubmit">确 定</el-button>
        </div>
       </el-dialog>
    </div>
</template>
<script>
import {getUserList, changeUserState, addUser, getUserById, editUser, deleteUser, getRoleList, grantUserRow} from '@/api'
export default {
    data() {
      return {
        loading: 'true',
        userList: [],
        total: 0,
        pagesize: 4,
        pagenum: 1,
        query: '',
        num:4,
        addForm: {
            username: '',
            password: '',
            email: '',
            mobile: ''
        },
        formLabelWidth: '80px',
        addDialogFormVisible: false,
        rules: {
            username: [
                { required: true, message: '请输入用户名', trigger: 'blur' }
            ],
            password: [
                { required: true, message: '请输入密码', trigger: 'blur' }
            ],
            email: [
                { required: true, message: '请输入邮箱地址', trigger: 'blur' },
                { type: 'email', message: '请输入正确的邮箱地址', trigger: 'blur,change' }
            ],
            mobile: [
                { required: true, message: '电话不能为空' }
            ]
        },
        editForm: {
            username: '',
            email: '',
            mobile: '',
            id: ''
        },
        editDialogFormVisible: false,
        grantForm: {},
        grantDialogFormVisible: false,
        roleId: '',
        roleList: []
      }
    },
    created() {
        this.initList()
    },
    methods: {
      handleSizeChange(val) {
        this.pagesize = val
        this.initList()
      },
      handleCurrentChange(val) {
        this.pagenum = val
        this.initList()
      },
      // 获取用户列表信息
      initList(){
            getUserList({params: {query: this.query, pagenum:this.pagenum , pagesize: this.pagesize}})     
            .then(res =>{
                this.userList = res.data.users
                this.total = res.data.total
                this.loading = false
            })     
      },
      // 改变用户状态
      changeUserState(row){
        changeUserState({uid: row.id, state: row.mg_state}).then(res => {
            if(res.meta.status === 200){
                this.$message({
                    type: 'success',
                    message: '用户状态修改成功'
                })
            }else{
                this.$message({
                    type: 'waring',
                    message: res.meta.msg
                })
            }
            
        })
      },
      // 添加用户
      addUserSubmit(){
          this.$refs.addUserForm.validate(valid => {
              console.log(this.$refs.addUserForm)
            if (valid) {
                addUser(this.addForm).then(res => {
                    if(res.meta.status === 201){
                        this.$message({
                            type: 'success',
                            message: '添加用户成功'
                        })
                        this.initList()
                        this.addDialogFormVisible = false
                    }else{
                        this.$message({
                            type: 'waring',
                            message: res.meta.msg
                        })
                    }
                })
              
            } else {
                return false;
            }
        });
      },
      // 根据id获取用户信息
      showEditDialog(row){
          this.editDialogFormVisible = true
          getUserById(row.id).then(res => {
              if(res.meta.status === 200) {
                  this.editForm.username = res.data.username
                  this.editForm.email = res.data.email
                  this.editForm.mobile = res.data.mobile
                  this.editForm.id = res.data.id
              }else{
                  this.$message({
                      type: 'waring',
                      message: '获取用户信息失败，请稍后尝试'
                  })
              }
          })
      },
      // 编辑用户
      editUserSubmit(){
          this.$refs.editUserForm.validate(valide => {
              if(valide){
                  editUser(this.editForm).then(res => {
                      if(res.meta.status === 200){
                          this.initList()
                          this.$message({
                              type: 'success',
                              message: '编辑成功'
                          })
                          this.editDialogFormVisible = false
                      }else{
                          this.$message({
                              type: 'waring',
                              message: res.meta.msg
                          })
                      }
                  })
              }
          })
      },
      // 删除用户
      deleteUser (row) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
            deleteUser(row.id).then(res =>{
                if(res.meta.status === 200){
                    this.initList()
                        this.$message({
                        type: 'success',
                        message: '删除成功!'
                    });
                }else{
                    this.$message({
                        type: 'waring',
                        message: res.meta.msg
                    })
                }
            })
         
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });          
        });
      },
      // 显示分配角色对话框
      showGrantDialog(row){
        this.grantForm = row
        this.grantDialogFormVisible = true
        getRoleList().then(res =>{
            if(res.meta.status === 200){
                this.roleList = res.data
            }
        })
      },
      grantUserSubmit(){
          if(!this.roleId){
            this.$message({
                type: 'error',
                message: '角色不能为空'
            })
        }else{
            grantUserRow({id: this.grantForm.id, rid: this.roleId}).then(res => {
                if(res.meta.status === 200){
                    this.$message({
                        type: 'success',
                        message: '分配角色成功'
                    })
                    this.grantDialogFormVisible = false
                }else{
                    this.$message({
                        type: 'error',
                        message: res.meta.msg
                    })
                }
            })
            
        }
          
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
