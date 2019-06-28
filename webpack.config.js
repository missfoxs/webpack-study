const path = require("path");
//引入webpack，启用热更新
const webpack = require("webpack");
// 导入在內存中生成html页面的插件
const htmlWebpackPlugin = require("html-webpack-plugin");
//Vue Loader v15 现在需要配合一个 webpack 插件才能正确使用
const VueLoaderPlugin = require('vue-loader/lib/plugin');

module.exports = {
    mode: "production", // 在webpack4.x中必须要有的参数，可以取production和development两个值。
    // 单文件入口，也可以配置成多个入口，比如自己的程序一个入口，第三方库一个入口
    entry: "./src/main.js",
    // 多个入口文件，也只有一个出口文件
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: "bundle.js"
    },
    devServer: { //配置dev-server命名参数的第二种方式,生成的bundle.js存放在内存中
        open: false, //自动打开浏览器
        port: 3001,
        contentBase: "src", //告诉服务器从哪里提供内容
        hot: true, //热更新
        proxy: {
            '/api': 'http://localhost:3000'
        },
        compress: true, //是否压缩
    },
    // 这个节点用于配置所有的第三方模块加载器
    module: {
        rules: [
            //处理css的第三方模块, use中的模块处理方式是从右向左
            {
                test: /\.css$/,
                use: ["style-loader", "css-loader"]
            },
            // 此处处理scss文件，loader需要使用sass
            {
                test: /\.scss$/,
                use: ["style-loader", "css-loader", "sass-loader"]
            },
            {
                test: /\.less$/,
                use: ["style-loader", "css-loader", "less-loader"]
            },
            // 处理图片引用的配置，碰到使用图片路由的地方都由url-loader处理，如果有limit限制，则使用file-loader处理。
            // 处理后的图片路径在项目的根目录下，但是我们可以通过name配置显示的方式.(X)
            // 处理后的图片还在原来的位置，只是名称显示成了hash值,但是我们可以通过name配置显示的方式
            {
                test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: "10000",
                        name: "img/[name].[hash:7].[ext]"
                    }
                }]
            },
            // 配置解析es6高级语法的babel-loader,需要使用exclude去除掉node_modules的文件，或者使用include
            {
                test: /\.js$/,
                use: "babel-loader",
                // 使用exclude不编译node_module中的所有文件,但是modules/webpack-dev-server/client需要编译，因此使用include
                //exclude: /node_modules/
                include: [path.join(__dirname, "./src"), path.join(__dirname, "node_modules/webpack-dev-server/client")]
            },
            {
                test: /\.vue$/,
                use: "vue-loader"
            }
            // 自己的Loader
            , {
                test: /\.html$/,
                use: [{
                    loader: path.resolve('loader/myLoader.js'),
                    options: { }
                }]
            }
        ]
    },
    plugins: [
        //热更新模块
        new webpack.HotModuleReplacementPlugin(),
        // 创建一个在內存中生成html页面的插件
        // 作用1：在內存中创建页面
        //     2：自动将打包好的js文件追加到內存页面中
        new htmlWebpackPlugin({
            title: 'webpack demo', //设置title的名字
            template: path.join(__dirname, "./src/index.html"), //要使用的模块路径
            filename: "index.html", //生成的内存页面的名称
            inject: 'body', //把模板注入到哪个标签后
            minify: false, //是否压缩
            hash: true, //是否hash化
            cache: false, //是否缓存
            showErrors: false //是否显示错误
        }),
        new VueLoaderPlugin()
    ],
    // 清除掉WARING提示
    performance: {
        hints: false
    },
    resolve: { // 解析模块请求的选项
        // modules: [   // 解析模块时告诉webpack应该去查找的路径
        //     "node_modules",
        //     path.resolve(__dirname, "app")
        // ]
        extensions: ['.js', '.json', '.css'], //使用扩展名，使用户不用输入文件后缀名
        // alias: {  //别名
        //     '@': path.resolve(__dirname, './src/')
        // }
    },
    // performance: {

    // }
};