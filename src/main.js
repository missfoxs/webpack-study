
// import在浏览器中会报错，
import $ from "jquery";
// webpack默认只能处理js文件，其他的包括css都不行，需要手动安装合适的第三方loader加载器
// 处理css需要安裝style-loader, css-loader。在webpack中新增module配置节点，
import "./css/main.css";
import "./css/index.less";
import "./css/index.scss";

import Vue from "vue";

import Hello from "./js/hello.vue";

//使用es6定义的方法导入
import router from "./js/router/router.js";

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

    let vm = new Vue({
        el: "#app",
        data: {
            msg: "this is a message"
        },
        components: {
            Hello
        },
        router,  //引入路由
        // 使用render渲染的组件会替换掉#app,因此，app中原本所有的东西都会被覆盖掉
        render: c => c(Hello)
        // template: '<Hello/>'
    });
});