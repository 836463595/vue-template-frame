// vue.config.js
const path = require('path')
const webpack = require('webpack')
const resolve = (dir) => path.join(__dirname, '.', dir)
const port = process.env.port || process.env.npm_config_port || 8081 // dev port

const name = 'Vue Template Frame' // page title
module.exports = {
  publicPath: './', // 处理打包后路径问题
  devServer: {
    port: port,
    open: true,
    overlay: {
      warnings: false,
      errors: true,
    },
  },
  configureWebpack: {
    // provide the app's title in webpack's name field, so that
    // it can be accessed in index.html to inject the correct title.
    name: name,
    resolve: {
      alias: {
        '@': resolve('src'),
      },
    },
  },
  chainWebpack: (config) => {
    config.module
      .rule('swf')
      .test(/\.swf$/)
      .use('url-loader')
      .loader('url-loader')
      .options({
        limit: 10000,
      })
    // svg-icon
    config.module
      .rule('svg')
      .exclude.add(resolve('src/icons'))
      .end()
    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'icon-[name]',
      })
      .end()
    const types = ['vue-modules', 'vue', 'normal-modules', 'normal']
    types.forEach((type) => addStyleResource(config.module.rule('scss').oneOf(type)))
  },
  //语法检测
  lintOnSave: false,
}

// 全局配置scss变量
function addStyleResource(rule) {
  rule
    .use('style-resource')
    .loader('style-resources-loader')
    .options({
      patterns: [path.resolve(__dirname, './src/styles/base.scss'), path.resolve(__dirname, './src/styles/layout.scss'), path.resolve(__dirname, './src/styles/mixin.scss')],
    })
}
