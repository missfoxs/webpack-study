
// import在瀏覽器中會報錯，
import $ from "jquery";
// webpack默認只能處理js文件，其他的包括css都不行，需要手動安裝合適的第三方loader加載器
// 處理css需要安裝style-loader, css-loader。在webpack中新增module配置節點，
import "./css/main.css";
import "./css/index.less";
import "./css/index.scss";

$(function () {
   // $("li:odd").css("backgroundColor", "red");

    class Person {
        //static info = {name: "tom", age: 20};
        static staticMethod() {
            return 'static method has been called.';
        }
    }
    // es6的部分高级语法浏览器不能识别(static)，需要使用babel转换
    //1 babel-core babel-loader babel-plugin-transform-runtime
    //2 babel-preset-env  babel-preset-stage-0
    //3 webpack.config.js中配置
    //4 添加.babelrc解析文件
    console.log(Person.staticMethod());
});