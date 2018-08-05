# TreeGrid组件使用说明

## Attributes


| 参数          | 说明           | 类型    | 可选值               | 默认值 |
| ------------- | -------------- | ------- | -------------------- | ------ |
| treeStructure | 是否树形结构   | Boolean | -                    | false  |
| columns       | 列的属性       | Array   | text/dataIndex/width | -      |
| dataSource    | 数据源         | Array   | -                    | []     |
| controls      | 是否显示操作列 | Boolean | -                    | true   |

## Events


| 事件名称 | 说明         | 回调参数   |
| -------- | ------------ | ---------- |
| deleteCate   | 删除商品分类 | 商品分类id |
| editCate     | 编辑商品分类 | 商品分类id |

## 示例

```html
    <tree-grid
      :treeStructure="true"
      :columns="columns"
      :data-source="dataSource"
      @deleteCate="deleteCategory"
      @editCate="editCategory"
    >
    </tree-grid>
```

```js
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
    }]
  }
},
methods: {
  deleteCategory (cid) {
    console.log(cid)
  },
  editCategory (cid) {
    console.log(cid)
  }
}
```

