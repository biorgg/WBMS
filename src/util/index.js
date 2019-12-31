import config from './../config'

// 存储localStorage
export const setStore = (name, content) => {
  if (!name) return
  if (typeof content !== 'string') {
    content = JSON.stringify(content)
  }
  window.localStorage.setItem(config.storePrefix + name, content)
}
// 获取localStorage
export const getStore = name => {
  if (!name) return
  return window.localStorage.getItem(config.storePrefix + name)
}

// 删除localStorage
export const removeStore = name => {
  if (!name) return
  window.localStorage.removeItem(config.storePrefix + name)
}

// 生成随机数
export const randomn = n => {
  if (n > 21) return null
  return parseInt((Math.random() + 1) * Math.pow(10, n - 1))
}
