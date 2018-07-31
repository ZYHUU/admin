<template>
     <div class="home">
        <el-container>            
             <el-aside width="auto">
                 <div class="logo"></div>  
                 <el-menu
                default-active="2"
                :collapse= 'isCollapse'
                class=" el-menu-admin"
              
                background-color="#545c64"
                text-color="#fff"
                active-text-color="#ffd04b">
                    <el-submenu index="1">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>导航一</span>
                        </template>                
                    <el-menu-item index="2">
                        <i class="el-icon-menu"></i>
                        <span slot="title">选项一</span>
                    </el-menu-item>
                </el-submenu>
               
                </el-menu>   
            </el-aside>
            <el-container>
                <!-- header部分 -->
               <el-header>
                   <i class='myicon myicon-menu toggle-btn'></i>
                   <dir class="system-title">电商后台管理系统</dir> 
                   <div>
                       <span class="welcome">您好,XXX</span> 
                       <el-button type="text">退出</el-button> 
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
export default {
    data(){
        return {
            isCollapse: false
        }
    },
    methods: {
        
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
