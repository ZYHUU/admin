<template>
     <div class="home">
        <el-container>            
             <el-aside width="auto">
                 <div class="logo"></div>  
                 <el-menu
                :unique-opened="true"      
                default-active="/user"
                :collapse= 'isCollapse'
                :router = true
                class=" el-menu-admin"
                @open="handleOpen"
                @close="handleClose"
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-submenu :index="item.path" v-for="item in menuData" :key=item.id>
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>                
                        <el-menu-item :index="tag.path" v-for= "tag in item.children" :key="tag.id">
                            <i class="el-icon-menu"></i>
                            <span slot="title">{{tag.authName}}</span>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>   
            </el-aside>
            <el-container>
                <!-- header部分 -->
               <el-header>
                   <i class='myicon myicon-menu toggle-btn' @click="toggleCollapse"></i>
                   <dir class="system-title">电商后台管理系统</dir> 
                   <div>
                       <span class="welcome">您好,{{$store.state.username}}</span> 
                       <el-button type="text" @click='logout'>退出</el-button> 
                   </div>
                   
               </el-header>
               <!-- 中间内容部分 -->
               <el-main>
                   <router-view></router-view>   
               </el-main>
            </el-container>
        </el-container>
       
    </div>
</template>
<script>
import {getMenu} from '@/api'
export default {
    data(){
        return {
            isCollapse: false,
            menuData: []
        }
    },
    methods: {
        handleOpen(key, keyPath) {
        },
        handleClose(key, keyPath) {
        },
        toggleCollapse(){
            this.isCollapse = ! this.isCollapse
        },
        logout(){
            // 清除登录状态，清除locaStorage中的token
            localStorage.removeItem('mytoken')
            // 跳转到登录页面
            this.$router.push({name: 'Login'})
        }
    },
    // 获取左侧菜单列表
    created(){
        getMenu().then(res =>{
            if(res.meta.status === 200){
                this.menuData = res.data
            }
        })
    }
}
</script>
<style lang="scss" scoped>

.home {
  height: 100%;
  background-color: #E5E5E5;
  .el-menu-admin:not(.el-menu--collapse) {
    width: 200px;
    min-height: 400px;
  }
  .el-container {
    height: 100%;
  }
  .el-menu-admin{
    border-right: 0;
  }
  .el-aside {
    background-color: #545c64;
  }
  .el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
   background-color: #545c64;
  }
  .logo {
    height:60px;
    background: url(../assets/logo.jpg);
    background-size: 100%;
    background-color: white;
  }
  .toggle-btn {
    padding: 0 10px;
    margin-left: -20px;
    font-size: 36px;
    line-height: 60px;
    color: white;
    cursor: pointer;
    &:hover {
      background-color: #00635a;
    }
  }
  .system-title {
    font-size: 28px;
    color: white;
  }
  .welcome {
    color: white;
  }
}
</style>
