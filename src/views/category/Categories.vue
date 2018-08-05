<template>
    <div class="categories">
        <el-row>
           <el-col :span='24'>
               <el-breadcrumb separator="/">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item><a href="/user">商品管理</a></el-breadcrumb-item>
                <el-breadcrumb-item>商品分类</el-breadcrumb-item>               
               </el-breadcrumb>
           </el-col>
       </el-row>
       <el-row>
            <el-button type="success" plain >添加商品</el-button>
       </el-row>
       <tree-grid
        :treeStructure="true"
        :columns="columns"
        :data-source="dataSource"
        @deleteCate="deleteCategory"
        @editCate="editCategory">
        </tree-grid>
        <div class="page">
            <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :current-page="1"
            :page-sizes="[10, 20, 30, 40]"
            :page-size="pagesize"
            layout="total, sizes, prev, pager, next, jumper"
            :total='total'>
            </el-pagination>
        </div>
    </div>
</template>
<script>
import TreeGrid from '@/components/TreeGrid/TreeGrid'
import {getCategories} from '@/api'
export default {
    data () {
        return {
            dataSource: [],
            columns: [{
            text: '分类名称',
            dataIndex: 'cat_name',
            width: ''
            }, {
            text: '是否有效',
            dataIndex: 'cat_deleted',
            width: ''
            }, {
            text: '排序',
            dataIndex: 'cat_level',
            width: ''
            }],
            pagesize: 10,
            pagenum: 1,
            total: '',
        }
    },
    components: {
        TreeGrid
    },
    created () {
        this.initList()
    },
    methods: {
        // TreeGrid
        deleteCategory (cid) {
            console.log(cid)
        },
        editCategory (cid) {
            console.log(cid)
        },
        // 分页
        handleSizeChange(val) {
            this.pagesize = val
            this.initList()
        },
        handleCurrentChange(val) {
            this.pagenum = val
            this.initList()
        },
        // 获取产品分类列表
        initList () {
            getCategories({type: '3',pagesize: this.pagesize, pagenum: this.pagenum}).then(res => {
               if (res.meta.status === 200) {
                   this.total = res.data.total
                   this.dataSource = res.data.result
               }
            })
        }
    }
}
</script>
<style lang="scss" scoped>

</style>
