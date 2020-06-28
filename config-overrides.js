/*
 * @Descripttion: coding...
 * @Version: 1.0.0版本
 * @Author: 张彤
 * @Date: 2020-03-04 17:50:01
 * @LastEditors: 张彤
 * @LastEditTime: 2020-06-28 12:47:35
 */ 
const { override, fixBabelImports, addLessLoader, addWebpackAlias } = require('customize-cra')
const path = require('path')
const resolveAlias = dir => path.join(__dirname, '.', dir)
const theme = require('./theme')

const proxyApi = {
  '/api': {
    target: 'https://api.zhangtong.work',
    changeOrigin: true,
    secure: false,
    xfwd: false,
    pathRewrite: {
      '^/api': '/'
    }
  }
}

module.exports = {
  webpack: override(
    fixBabelImports('import', {
      libraryName: 'antd',
      libraryDirectory: 'es',
      style: true
    }),
    addLessLoader({
      noIeCompat: true,
      javascriptEnabled: true,
      modifyVars: { ...theme }
    }),
    addWebpackAlias({
      '@': resolveAlias('src')
    })
  ),
  devServer: configFunction => (proxy, allowedHost) => {
    proxy = process.env.NODE_ENV === 'development' ? proxyApi : null
    const config = configFunction(proxy, allowedHost)
    return config
  }
}
