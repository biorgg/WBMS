import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/view/login'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/login',
      name: 'Login',
      component: Login
    }
  ]
})

router.beforeEach((to, from, next) => {
  console.log(to.path)
  next()
  // next({ name: 'Login' })
})

export default router
