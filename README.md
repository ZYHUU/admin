### 基于vue的商城后台管理系统
### 技术栈
##### 前端
- vue
- vue.router
- axios
- Element-UI
- webpack
##### 后端
- node.js
- express
- mysql
### 项目业务分析
电商业务

- 对外网站（用户购买）
- 后台管理端（用于运营人员）
- 移动Web
- APP
- 数据分析（用户行为分析）
- 数据统计系统（财务）
### 下载本项目
`git clone 'git@github.com:ZYHUU/admin.git'`
### 项目依赖
node.js(>= 6.0.0)
### 安装
##### 1.部署本地服务器(后端) 
- 找到根目录下的dep文件夹。
- 把mydb.sql导入本地的数据库。phpStudy，Navicat for MySQL 或者其他数据库工具都可。
- 另外创建一个文件夹（后端使用）把package.json文件放到这个文件夹下，cmd运行`npm i`。下载完成后，再cmd运行 `node app` 。ok此时本地服务器已经部署完成。
##### 2.前端
- 打开admin文件夹，cmd运行 `npm i`下载依赖的包
- cmd运行`npm run dev`
- 打开浏览器访问`http://localhost:8080/#/`

