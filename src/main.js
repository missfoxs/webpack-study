
// import在瀏覽器中會報錯，
import $ from "jquery";
// webpack默認只能處理js文件，其他的包括css都不行，需要手動安裝合適的第三方loader加載器
// 處理css需要安裝style-loader, css-loader。在webpack中新增module配置節點，
import "./css/index.css"

$(function () {
   $("li:odd").css("backgroundColor", "red");
});