import { getStore } from '@/util'

const user = {
  namespaced: true,
  state: {
    name: getStore('name') ? getStore('name') : null, // 用户 name
    token: getStore('token') ? getStore('token') : null // 用户 token
  },
  mutations: {
    // 设置用户名
    SETNAME (state, params) {
      state.name = params
    },
    SETTOKEN (state, params) {
      state.token = params
    }
  }

}

export default user
