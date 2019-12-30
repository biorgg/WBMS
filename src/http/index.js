// /**
//  * 作用：对axios数据请求插件进一步封装
//  * 前端只需要传参数，拿结果即可
//  */

// import http from './http'
// const noop = () => undefined

// export async function Get (url, par = {}, callback = noop) {
//   const res = await http.request({ method: 'GET', url, data: par })
//   callback && callback(res.data)
//   return res.data
// }
// export async function Post (url, par = {}, callback = noop) {
//   const res = await http.request({ method: 'POST', url, data: par })
//   callback && callback(res.data)
//   return res.data
// }
// export async function Put (url, par = {}, callback = noop) {
//   const res = await http.request({ method: 'PUT', url, data: par })
//   callback && callback(res.data)
//   return res.data
// }
// export async function Delete (url, par = {}, callback = noop) {
//   const res = await http.request({ method: 'DELETE', url, data: par })
//   callback && callback(res.data)
//   return res.data
// }

/**
 * 作用：负责发送ajax请求,并对请求和响应进行拦截,实现更丰富的功能
 */
import Config from './../config'
import axios from 'axios'
import store from './../store/index'
import {
  LoadingBar,
  Notice,
  Message
} from 'iview'
import {
  getStore,
  setStore
} from '../util'

let instance = axios.create(Config.httpConfig)

// 请求拦截
instance.interceptors.request.use(config => {
  LoadingBar.start()
  return config
})

// 响应拦截
instance.interceptors.response.use(
  response => {
    let status = response.data.status
    if (status === -2) {
      Notice.error({
        title: '用户信息已过期，请重新登陆',
        duration: 2,
        onClose () {
          reLogin()
        }
      })
      LoadingBar.finish()
      Promise.reject(response)
    } else {
      LoadingBar.finish()
      return response
    }
  },
  err => {
    if (err && err.response) {
      switch (err.response.status) {
        case 400:
          err.message = '请求错误'
          break

        case 401:
          err.message = '未授权，请登录'
          Notice.error({
            title: '用户信息已过期，请重新登陆',
            duration: 2,
            onClose () {
              reLogin()
            }
          })
          break

        case 403:
          err.message = '拒绝访问'
          break

        case 404:
          err.message = `请求地址出错: ${err.response.config.url}`
          break

        case 408:
          err.message = '请求超时'
          break

        case 500:
          err.message = '服务器内部错误'
          break

        case 501:
          err.message = '服务未实现'
          break

        case 502:
          err.message = '网关错误'
          break

        case 503:
          err.message = '服务不可用'
          break

        case 504:
          err.message = '网关超时'
          break

        case 505:
          err.message = 'HTTP版本不受支持'
          break

        default:
      }
    }
    LoadingBar.error()
    Message.error('网络故障了，请稍后再试~')
    // return Promise.reject(err);
  }
)

/**
 * read user token from localstorage
 */
function readToken () {
  const token = getStore('token')
  return (token) || ''
}

function reLogin () {
  store.dispatch('loginOut')
  window.location = '/#/login'
  window.location.reload()
}

class Http {
  constructor () {
    // initialize user's token from localstorage
    this.token = readToken()
  }

  updateToken () {
    return readToken()
  }

  request ({
    url,
    method,
    headers,
    data,
    timeout = Config.httpConfig.timeout,
    ...rest
  }) {
    const self = this
    this.token = this.updateToken()
    // merge headers with customer defined ones
    headers = Object.assign({}, {
      Authorization: self.token
    }, headers)
    let references
    if (method === 'GET' || method === 'DELETE') {
      references = {
        params: data
      }
    } else if (method === 'POST' || method === 'PUT') {
      references = {
        data
      }
    }
    return instance.request({
      method,
      url,
      headers,
      timeout,
      ...references,
      ...rest
    })
  }
}

export default new Http()
