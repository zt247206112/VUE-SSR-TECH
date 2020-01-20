const path = require('path');
const VueLoaderPlugin = require('vue-loader/lib/plugin');
module.exports = {
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
                test: /\.(png|jpg|gif|svg)$/i,
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
    ]
}