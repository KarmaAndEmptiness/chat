const { merge } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
module.exports = merge(base, {
    mode: 'production',
    module: {
        rules: [
            {
                test: /\.(s?c|le)ss$/,
                exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    'css-loader',
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env'
                                ]
                            }
                        },
                    }
                ]
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: 'css/[hash:8].css'
        })
    ],
    optimization: {
        minimizer: [
            new CssMinimizerPlugin()
        ]
    }
})