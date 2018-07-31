import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
Vue.use(Router)

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login },
    {name: 'home', path: '/', component: Home}
  ]
})
