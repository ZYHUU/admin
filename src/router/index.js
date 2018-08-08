import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome/Welcome'
import User from '@/views/user/User'
import Rights from '@/views/rights/Rights'
import Roles from '@/views/rights/Roles'
import Categories from '@/views/category/Categories'
import Goods from '@/views/category/Goods'
import Orders from '@/views/order/Orders'
import Reports from '@/views/report/Reports'
import Params from '@/views/category/Params'
Vue.use(Router)

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login },
    {
      name: 'home', path: '/', component: Home,     
      children: [
        { name: 'welcom', path: 'welcome', component: Welcome },
        { name: 'user', path: 'users', component: User },
        { name: 'rights', path: 'rights', component: Rights },
        { name: 'roles', path: 'roles', component: Roles },
        { name: 'categories', path: 'categories', component: Categories },
        { name: 'goods', path: 'goods', component: Goods },
        { name: 'orders', path: 'orders', component: Orders },
        { name: 'reports', path: 'reports', component: Reports },
        { name: 'params', path: 'params', component: Params },
      ],
      redirect: {path: 'welcome' },
    }
  ]
})
