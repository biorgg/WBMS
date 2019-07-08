// import { Get } from './../http'
import http from '@/http'

export default {
  // 用户登录
  async login (params) {
    const res = await http.request({
      url: 'user/login',
      method: 'Get',
      data: params
    })
    return res
  }

}
