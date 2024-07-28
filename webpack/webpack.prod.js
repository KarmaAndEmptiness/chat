const { mergeWithRules } = require('webpack-merge')
const base = require('./webpack.base.js')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const CssMinimizerPlugin = require('css-minimizer-webpack-plugin')
const customMerge = mergeWithRules({
    module: {
        rules: {
            test: 'match',
            use: 'replace'
        }
    }
})
module.exports = customMerge(base, {
    mode: 'production',
    output: {
        publicPath: './'
    },
    module: {
        rules: [
            {
                test: /\.(css|scss|less)$/i,
                // exclude: /node_modules/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options: {
                            modules: true,
                        }
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            postcssOptions: {
                                plugins: [
                                    'postcss-preset-env',
                                    'autoprefixer'
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
        ],
        splitChunks: {
            chunks: 'all'
        }
    }
})