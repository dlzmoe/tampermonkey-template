// ==UserScript==
// @name         全局摸鱼看掘金沸点
// @namespace    https://github.com/zburu
// @version      0.0.6
// @description  Tampermonkey description
// @author       zburu
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/chrome/static/images/chrome-logo-m100.svg
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  "use strict";
  $(function () {
    $("body").append(
      "<style>body{min-height:100vh}#juejin-btn{background:#2684a3;color:#fff;padding:6px 15px;border-radius:4px;position:fixed;right:-60px;top:100px;transition:all .1s linear;z-index:9999}#juejin-btn:hover{right:0;cursor:pointer}#juejin-opacity{position:fixed;top:0;left:0;width:100vw;height:100vh;z-index:99999}#juejin-chrome{position:fixed;right:0;top:0;height:100vh;width:500px;background:#fff;box-sizing:border-box;box-shadow:1px 2px 10px rgba(0,0,0,.2);z-index:999999}iframe{border:none;outline:0}.juejin-input{outline:0;border:1px solid #000;padding:2px 6px;box-sizing:border-box;border-radius:5px;margin-bottom:10px;color:#000;height:30px}.juejin-default,.juejin-load,.juejin-setting{background:#333;color:#fff;margin-left:10px;outline:0;border-radius:5px;cursor:pointer;height:30px}.none{opacity:0!important;z-index:-1!important}</style>" +
        '<div id="juejin-opacity" class="none"></div><div id="juejin-btn">点击展开</div>' +
        '<div id="juejin-chrome" class="none">' +
        '侧栏宽度：<input class="juejin-input" type="number" value="500"><input class="juejin-setting" type="button" value="确定"><input class="juejin-default" type="button" value="恢复默认"><input class="juejin-load" type="button" value="刷新掘金">' +
        "</div>"
    );
    $("#juejin-chrome").append(
      '<iframe id="juejin-iframe" width="100%" height="100%" src="https://juejin.cn/pins"></ifrmae>'
    );

    // 展开侧栏
    $("#juejin-btn").click(function () {
      $("#juejin-chrome").removeClass("none");
      $("#juejin-opacity").removeClass("none");
      const number = JSON.parse(localStorage.getItem("number"));
      $("#juejin-chrome").css("width", number);
      $(".juejin-input").val(number);
    });

    // const arr = 500;
    // 收起侧边
    $("#juejin-opacity").click(function () {
      $("#juejin-chrome").addClass("none");
      $("#juejin-opacity").addClass("none");
      const number = $(".juejin-input").val();
      localStorage.setItem("number", JSON.stringify(number));
    });

    // 自定义设置宽度
    $(".juejin-setting").click(function () {
      const number = $(".juejin-input").val();
      console.log(number);
      $("#juejin-chrome").css("width", number);
      localStorage.setItem("number", JSON.stringify(number));
    });

    $(".juejin-default").click(function () {
      $("#juejin-chrome").css("width", "500px");
      $(".juejin-input").val(500);
      const number = $(".juejin-input").val();
      localStorage.setItem("number", JSON.stringify(number));
    });

    $(".juejin-load").click(function () {
      $("#juejin-iframe").attr("src", $("#juejin-iframe").attr("src"));
    });

    if (window.location.host == "juejin.cn") {
      $("#juejin-opacity").hide();
      $("#juejin-chrome").hide();
      $("#juejin-btn").hide();
    }
  });
})();
