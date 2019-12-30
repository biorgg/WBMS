/**
 * 作用：保存全局使用的一些变量
 */
const env = process.env.NODE_ENV
const isDev = (env === 'development')

const output = isDev ? {
  // 存储localStorage时设置前缀
  storePrefix: 'WBMS_',
  // 存储axios中的一些变量
  httpConfig: {
    // baseURL: 'https://gw.chinayzyx.com',
    baseURL: 'https://www.fastmock.site/mock/df8e393096fdca27a047454ae45ecc01/wbmsmock',
    timeout: 10000
  }
} : {}

export default output
