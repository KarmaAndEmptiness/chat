const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
module.exports = {
    entry: path.resolve(__dirname, '../src/index.jsx'),
    output: {
        path: path.resolve(__dirname, '../build'),
        filename: 'js/[name].[hash:8].js'
    },
    resolve: {
        extensions: ['.jsx', '.js', '.json', '.mjs', '.css', '.scss', '.less']
    },
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /node_modules/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            '@babel/preset-env',
                            '@babel/preset-react'
                        ]
                    }
                }
            },
            {
                test: /\.(s?c|le)ss$/,
                exclude: /node_modules/,
                use: [
                    'style-loader',//css-loader处理过之后 它负责将 css 样式通过 style 标签插入到 DOM 中
                    'css-loader',// 处理过的 css 可以使用css-loader 来解析成 js 
                    {
                        loader: 'postcss-loader',
                        // 它可以帮助我们将一些现代的 CSS 特性，转成大多数浏览器认识的 CSS，并且会根据目标浏览器或运行时环境添加所需的 polyfill；
                        // 也包括会自动帮助我们添加 autoprefixer
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        },
                    }
                ]
            },
            {
                test: /\.(png|jpe?g)$/i,
                use: [
                    // {loader:'file-loader'},
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'img/[name].[hash:8].[ext]',
                            limit: 2048
                        }
                    }
                ]
            },
            {
                test: /\.(ttf|woff2?)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            name: 'fonts/[name].[hash:8].[ext]',
                            limit: 0
                        }
                    }
                ]
            },
            // {
            //     test: /\.(ttf|woff2?)$/i,
            //     type: 'asset',
            //     generator: {
            //         filename: 'fonts/[name].[hash:8].[ext]'
            //     },
            //     parser: {
            //         dataUrlCondition: {
            //             maxSize: 8 * 1024 // 8kb
            //         }
            //     }
            // }
        ]
    },
    plugins: [
        new HtmlWebpackPlugin(
            {
                template: path.resolve(__dirname, '../index.html')
            }
        )
    ]
}