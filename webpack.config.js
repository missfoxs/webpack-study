const path = require("path");
//引入webpack，启用热更新
const webpack = require("webpack");
// 导入在內存中生成html页面的插件
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    devServer: {  //配置dev-server命名参数的第二种方式
        open: false, //自动打开浏览器
        port: 3000,
        contentBase: "src",
        hot: true  //热更新
    },
    // 这个节点用于配置所有的第三方模块加载器
    module: {
        rules: [
            //处理css的第三方模块, use中的模块处理方式是从右向左
            { test: /\.css$/, use: ["style-loader", "css-loader"]},
            // 此处处理scss文件，loader需要使用sass
            { test: /\.scss$/, use: ["style-loader", "css-loader", "sass-loader"]},
            { test: /\.less$/, use: ["style-loader", "css-loader", "less-loader"]},
            // 处理图片引用的配置，碰到使用图片路由的地方都由url-loader处理，如果有limit限制，则使用file-loader处理。
            // 处理后的图片路径在项目的根目录下，但是我们可以通过name配置显示的方式.(X)
            // 处理后的图片还在原来的位置，只是名称显示成了hash值,但是我们可以通过name配置显示的方式
            { test: /\.(jpg|png|gif)$/,
                use: [{
                    loader: "url-loader",
                    options: {
                        limit: "10000",
                        name: "img/[name].[hash:7].[ext]"
                    }
                }]
            }
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //热更新模块
        // 作用1：在內存中创建页面
        //     2：自动将打包好的js文件追加到內存中頁面中
        new htmlWebpackPlugin({     // 创建一个在內存中生成html页面的插件
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html"
        })
    ]
};
