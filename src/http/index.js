/**
 * 作用：对axios数据请求插件进一步封装
 * 前端只需要传参数，拿结果即可
 */

import http from './http'
const noop = () => undefined

export async function Get (url, par = {}, callback = noop) {
  const res = await http.request({ method: 'GET', url, data: par })
  callback && callback(res.data)
  return res.data
}
export async function Post (url, par = {}, callback = noop) {
  const res = await http.request({ method: 'POST', url, data: par })
  callback && callback(res.data)
  return res.data
}
export async function Put (url, par = {}, callback = noop) {
  const res = await http.request({ method: 'PUT', url, data: par })
  callback && callback(res.data)
  return res.data
}
export async function Delete (url, par = {}, callback = noop) {
  const res = await http.request({ method: 'DELETE', url, data: par })
  callback && callback(res.data)
  return res.data
}
