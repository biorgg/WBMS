/**
 * 作用：保存全局使用的一些变量
 */

export default {
  // 存储localStorage时设置前缀
  storePrefix: 'WBMS_',
  // 存储axios中的一些变量
  httpConfig: {
    baseURL: 'https://gateway.chinayzyx.com',
    timeout: 10000
  }
}
