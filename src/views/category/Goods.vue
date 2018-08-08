<template>
  <div class="goods">
    <el-row>
      <el-col :span='24'>
          <el-breadcrumb separator="/">
          <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
          <el-breadcrumb-item>商品管理</el-breadcrumb-item>
          <el-breadcrumb-item> <span class="currentpage">商品列表</span></el-breadcrumb-item>               
          </el-breadcrumb>
      </el-col>
    </el-row>
    <el-table :data="goodsList" border v-loading='loading' style="width: 100%" >
      <el-table-column label="商品名称" width="280">
        <template slot-scope="scope">    
          <span style="margin-left: 10px">{{ scope.row.thirdName }}</span>
        </template>
      </el-table-column>
     <el-table-column label="所属类目" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.secondName }}</span>
        </template>
      </el-table-column>
      <el-table-column label="所属模块" width="280">
        <template slot-scope="scope">
          <span style="margin-left: 10px">{{ scope.row.firstName }}</span>
        </template>
      </el-table-column>
    </el-table>
  
  </div>
</template>

<script>
import {getCategories} from '@/api'
export default {
  data () {
    return {
      loading: true,
      goodsList: [
        
      ]
    }
  },
  created () {
    this.inintlist()
    this.loading = false
  },
  methods: {
    inintlist () {
      getCategories({type: 3}).then(res => {
        if (res.meta.status === 200) {
          res.data.forEach(first => {
            if (first.children) {
              first.children.forEach(second => {
                if (second.children) {
                  second.children.forEach(third => {
                    this.goodsList.push({thirdName: third.cat_name, secondName: second.cat_name, firstName: first.cat_name})
                  })
                }
              })
            }            
          })  
        }
        this.total = this.goodsList.length
      })
    } 
  },
}
</script>

<style lang='scss'>

</style>
