import Vue from 'vue'
import Vuex from 'vuex'

import { setStore } from '@/util'
import { Message } from 'iview'

import user from './modules/user'
import { userApi } from './../api/index'
// import position from './modules/position';
// import state from './state';
// import getters from './getters';
// import mutations from './mutation';
// import actions from './actions';

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    user
  },
  state: {},
  getters: {
    // 用户 name
    name: state => state.user.name,
    // 用户token
    token: state => state.user.token
  },
  mutations: {},
  actions: {
    // 登陆
    login ({commit}, params) {
      userApi.login(params, res => {
        if (res.status === 1) {
          // if (!res.data.roles[0]) {
          //   Message.warning({ title: '该账户未分配角色,无法登录,请联系管理员!', duration: 3 })
          //   return Promise.resolve(res.data.roles[0])
          // }
          // commit('user/SETNAME', res.data.name)
          // setStore('name', res.data.name)
          // commit('user/SETTOKEN', res.data.token)
          // setStore('token', res.data.token)
          // commit('user/SETALLROLE', res.data.roles)
          // // setStore('allRole', res.data.roles)
          // // commit('user/SETCURRENTROLE', res.data.roles[0].roleId)
          // // setStore('currentRole', res.data.roles[0].roleId)
          return Promise.resolve(res)
        } else {
          return Promise.reject(res)
        }
      })
    }
  }
})
