import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  let token = null
  if (token) {
    console.log(11111)
  } else {
    if (to.path === '/login') {
      next()
    } else {
      next({ name: 'login' })
    }
  }
})

export default router
