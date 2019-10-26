// import { Get } from './../http'
import http from './../http'

// 用户登录
const login = async ({jobNo = '', pwd = '', timestamp = ''}) => {
  const res = await http.request({
    url: 'auth/login',
    method: 'POST',
    data: {jobNo, pwd, timestamp}
  })
  return res.data
}
export default {
  login
}
