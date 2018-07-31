import Vue from 'vue'
import App from './App'
import router from './router'
// 引入element-ui
import ElementUi from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

 import "@/styles/reset.css"
 import "@/styles/index.css"
 // 用来重置element-ui样式
 import "@/styles/element.css"
 import "@/styles/icon.css"

Vue.use(ElementUi)
Vue.config.productionTip = false

// 注册路由全局守卫
router.beforeEach((to, from, next) => {
  let token = localStorage.getItem('mytoken')
  if (token) {
    next()
  } else {
    if (to.path !== '/login') {
      next({path: '/login'})
    } else {
      next()
    }
  }
})

new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
