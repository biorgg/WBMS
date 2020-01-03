// import { Get } from './../http'
import http from './../http'

export default {
  // 用户登录
  async login ({
    jobNo = '',
    pwd = '',
    timestamp = ''
  }) {
    const res = await http.request({
      url: 'auth/login',
      method: 'POST',
      data: {
        jobNo,
        pwd,
        timestamp
      }
    })
    return res.data
  },

  // 获取登录验证码
  async getLoginCode (randomStr) {
    const res = await http.request({
      url: `code?randomStr=${randomStr}`,
      method: 'GET'
    })
    return res.data
  }

}
