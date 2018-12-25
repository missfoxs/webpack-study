const path = require("path");
const webpack = require("webpack");  //引入webpack，啟用熱更新
// 導入在內存中生成html頁面的插件
const htmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
    entry: "./src/main.js",
    output: {
        path: path.resolve(__dirname,'dist'),
        filename: "bundle.js"
    },
    devServer: {  //配置dev-server命名參數的第二種方式
        open: true, //自動打開瀏覽器
        port: 3000,
        contentBase: "src",
        hot: true  //熱更新
    },
    // 這個節點用於配置所有的第三方模塊加載器
    module: {
        rules: [
            //處理css的第三方模塊
            { test: /\.css/, use: ["style-loader", "css-loader"]}
        ]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(), //熱更新模塊
        // 作用1：在內存中創建頁面
        //     2：自動將打包好的js文件追加到內存中頁面中區
        new htmlWebpackPlugin({     //創建一個而在內存中生成html頁面的插件
            template: path.join(__dirname, "./src/index.html"),
            filename: "index.html"
        })
    ]
};
