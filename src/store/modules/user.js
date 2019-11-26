import { getStore } from '@/util'

const user = {
  namespaced: true,
  state: {
    name: getStore('name') ? getStore('name') : null, // 用户 name
    token: getStore('token') ? getStore('token') : null, // 用户 token
    theme: 'primary'
  },
  mutations: {
    // 设置用户名
    SETNAME (state, params) {
      state.name = params
    },
    // 设置 token
    SETTOKEN (state, params) {
      state.token = params
    },
    // set theme
    SETTHEME (state, params) {
      state.theme = params
    }
  }

}

export default user
