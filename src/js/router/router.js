import Vue from "vue";
import VueRouter from "vue-router";
Vue.use(VueRouter);
//导入页面
import Login from "../userManage/Login.vue";
import Register from "../userManage/Register.vue";

const routes = [
    {path: "/login", component: Login},
    {path: "/register", component: Register},
];

let router = new VueRouter({
    routes
});

// 使用es6定义的导出方式导出
export default router;