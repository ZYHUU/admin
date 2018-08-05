<template>
    <div class="rights">
        <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">权限管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>权限列表</el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-table  :data="rightList" border v-loading='loading' style="width: 100%">
           <el-table-column type="index" width="50">
            </el-table-column>
            <el-table-column  label="权限名称" prop='authName'>
            </el-table-column>
            <el-table-column label="路径" prop='path'>
            </el-table-column>
            <el-table-column label="层级">
                <template slot-scope="scope">
                    <span>{{scope.row.level | fmtLevel }}</span>
                </template>
            </el-table-column>
        </el-table>    
    </div>
</template>
<script>
import {getRightList} from '@/api'
export default {
    data(){
        return {
            rightList: [],
            loading: true,
        }
    },
    created() {
        this.initLinst();
    },
    filters: {
        fmtLevel(val) {
             if(val === '0'){
                return '一级'
            }else if(val === '1'){
                return '二级'
            }else {
                return '三级'
            }
        }
    },
    methods: {
        // 获取所有权限列表
        initLinst() {
            getRightList({type: 'list'}).then(res => {
                if(res.meta.status === 200) {               
                    this.rightList = res.data
                    this.loading = false
                }
            })
        }
    }
}
</script>
<style scoped>

</style>
