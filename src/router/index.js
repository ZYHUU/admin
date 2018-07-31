import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/views/Login.vue'
import Home from '@/views/Home.vue'
import Welcome from '@/views/welcome/Welcome'
Vue.use(Router)

export default new Router({
  routes: [
    {name: 'Login', path: '/login', component: Login },
    {
      name: 'home', path: '/', component: Home,
      redirect: {path: 'welcome' },
      children: [
        {name: 'welcom', path: 'welcome', component: Welcome}
      ]
    }
  ]
})
