const ENV = {
  // 正常命令
  // development: ["http://1826241454:9013", "http: //gatewaytest.1235154.com"], // 测试
  development: ['https://gateway.text.com', 'https://gateway.text.com'], //正式服
  production: 'https://gateway.text.com',

  // 新配置命令
  test: 'https://gateway.text.com', // 测试服路径
  prod: 'https://gateway.text.com', // 正式服路径
}

/**
 * VUE_APP_TITLE: 全局环境变量
 *
 * 由于公司开发环境存在多个域，此处将全部域名暴露出去
 */

export function getUrl() {
  return ENV[process.env.VUE_APP_TITLE]
}
