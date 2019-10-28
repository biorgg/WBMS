import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import Login from '@/view/login'
import store from '@/store'
import {getStore} from '@/util'

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
  iView.LoadingBar.start()
  let token = getStore('token')
  if (to.name === 'login') return next()
  if (!token) {
    next({
      name: 'login'
    })
  } else {
    next()
  }
})

router.afterEach((to, from) => {
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router
