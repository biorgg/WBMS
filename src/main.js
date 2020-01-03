// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import iView from 'iview'

Vue.config.productionTip = false
Vue.use(iView)

const mixins = {
  methods: {
    // 生成随机数
    getrandomNum (n) {
      if (n > 21) return null
      return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
    }
  }
}

Vue.mixin(mixins)

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: {
    App
  },
  store,
  template: '<App/>'
})
