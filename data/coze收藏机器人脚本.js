// ==UserScript==
// @name         coze收藏机器人脚本
// @namespace    https://github.com/98zi/MyTampermonkey
// @version      0.0.1
// @description  Tampermonkey description
// @author       98zi
// @match        https://www.coze.com/explore/*
// @icon         https://sf-coze-web-cdn.coze.com/obj/coze-web-sg/obric/coze/favicon.1970.png
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';

  $(function () {

    $('body').append(`
    <style>#cozestar>button{position:fixed;left:34px;bottom:230px;width:40px;height:40px;background:#4d53e8;z-index:9999;border-radius:50%;display:flex;align-items:center;justify-content:center;padding:8px;border:none;outline:0;cursor:pointer}#cozestar>button svg{color:#fff}#cozestar ul{position:fixed;left:50%;top:50%;width:100%;max-width:500px;height:300px;transform:translate(-50%,-50%);background:#fff;box-shadow:1px 2px 10px rgba(0,0,0,.2);border-radius:4px;list-style:none;padding:10px;transition:all .2s linear;opacity:0;visibility:hidden;margin-top:10px}#cozestar ul.act{opacity:1;visibility:inherit;margin-top:0}#cozestar ul li a{text-decoration:none;color:#333;background:#f3f3f3;border-radius:5px;padding:7px 10px;margin-bottom:6px;width:100%;display:flex;transition:all .2s linear}#cozestar ul li a:hover{background:#dcd9d9}</style>
    <div id="cozestar">
      <button><svg xmlns="http://www.w3.org/2000/svg" class="icon icon-tabler icon-tabler-star-filled" width="24" height="24" viewBox="0 0 24 24" stroke-width="2" stroke="currentColor" fill="none" stroke-linecap="round" stroke-linejoin="round"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M8.243 7.34l-6.38 .925l-.113 .023a1 1 0 0 0 -.44 1.684l4.622 4.499l-1.09 6.355l-.013 .11a1 1 0 0 0 1.464 .944l5.706 -3l5.693 3l.1 .046a1 1 0 0 0 1.352 -1.1l-1.091 -6.355l4.624 -4.5l.078 -.085a1 1 0 0 0 -.633 -1.62l-6.38 -.926l-2.852 -5.78a1 1 0 0 0 -1.794 0l-2.853 5.78z" stroke-width="0" fill="currentColor" /></svg></button>
      <ul>

        <li><a href="https://www.coze.com/explore/7315691056887267330" target="_self">网址内容读取</a></li>
        <li><a href="https://www.coze.com/explore/7311350089870491649" target="_self">城市天气壁纸</a></li>

      </ul>
    </div>
    
    `);

    $('#cozestar button').click(function(){
      $('#cozestar ul').toggleClass('act');
    })
  })

})();