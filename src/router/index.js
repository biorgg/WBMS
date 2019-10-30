import Vue from 'vue'
import iView from 'iview'
import Router from 'vue-router'
import Login from '@/view/login'
import Main from '@/view/Main.vue'
import store from '@/store'
import {getStore} from '@/util'

Vue.use(Router)

const mainRouter = {
  path: '/',
  name: 'mainRouter',
  redirect: '/home',
  component: Main,
  children: [
    { path: 'home', title: '首页', name: 'home_index', component: () => import('@/view/home/home.vue') }
  ]

}

const router = new Router({
  routes: [
    mainRouter,
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
