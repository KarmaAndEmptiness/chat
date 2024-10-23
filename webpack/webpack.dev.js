const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
module.exports = merge(base, {
    mode: 'development',
    output: {
        publicPath: '/'
    },
    devServer: {
        port: 3000,
        allowedHosts: 'all',
        historyApiFallback: true, // 支持 SPA 路由
    },
})