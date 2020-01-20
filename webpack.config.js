const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
const HTMLPlugin = require('html-webpack-plugin');
const webpack = require('webpack');

const isDev = process.env.NODE_ENV === 'development' // 判断当前环境是否为开发环境
const config = {
    target: 'web',
    entry: path.join(__dirname, 'src/index.js'),
    output: {
        filename: 'bundle.js',
        path: path.join(__dirname, 'dist')
    },
    module: {
        rules: [
            { // 用于处理vue文件
                test: /.vue$/,
                loader: 'vue-loader'
            },
            { // 用于处理es6
                test: /\.m?js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                  loader: 'babel-loader',
                  options: {
                    presets: ['@babel/preset-env']
                  }
                }
            },
            { // 用于处理css
                test: /\.m?css$/,
                use: [
                    {
                        loader: 'style-loader'
                    },
                    {
                        loader: 'css-loader'
                    },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: [
                                require("autoprefixer")
                            ]
                        }
                    }
                ]
            },
            { // 用于处理图片
                test: /\.(png|jpg|gif|svg|jpeg)$/i,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 1024, // url-loader比file-loader多出来这个属性，该值为图片的文件大小值，大于这个值压缩打包，小于这个值，转换成base64
                            name: '[name].[ext]',
                            esModule: false // 以前版本是默认false（默认情况下，file-loader生成使用ES模块语法的JS模块），新版本默认true
                        }
                    },
                    { // 压缩图片大小
                        loader: 'image-webpack-loader'
                    }
                ]
            },
            { // 一种css预处理器，风格是随意书写css代码
                test: /.styl$/,
                use: [
                    'style-loader',
                    'css-loader',
                    'stylus-loader'
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin(), // 该插件用于配合15.*版本以上的vue-loader
        new HTMLPlugin(),
        new webpack.DefinePlugin({
            'process.env': {
                NODE_ENV: isDev ? '"development"' : '"prodection"'
            }
        })
    ]
}

// 根据开发环境还是部署环境进行处理

if (isDev) {
    config.devtool = '#cheap-module-eval-source-map' // 用于浏览器显示webpack处理后的文件的源文件（es6等代码被webpack处理后可能我们不认识）
    config.devServer = {
        port: 8000,
        host: '0.0.0.0',
        overlay: {
            errors: true, // 编译报错显示在网页上
        },
        open: false, // webpack-dev-server启动后会自动打开浏览器（现在是关闭状态）
        hot: true, // 改变一个组件代码时，不会从新渲染整个页面，只会渲染当前组件的代码
    }
    config.plugins.push( // 用于配合上边的hot属性，达到热更新功能
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin()
    )
}


module.exports = config;