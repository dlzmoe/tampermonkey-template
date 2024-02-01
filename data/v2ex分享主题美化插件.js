// ==UserScript==
// @name         v2ex 分享主题美化插件
// @namespace    Violentmonkey Scripts
// @match        https://www.v2ex.com/help/api*
// @grant        none
// @version      1.0
// @author       98zi
// @description  2024/2/1 17:38:49
// @require      https://cdn.zishu.me/js/jquery3.6.0.js
// ==/UserScript==

(function () {
  'use strict';

    var url = "1010722";
    var token = "";
    $.ajax({
      url: "https://www.v2ex.com/api/v2/topics/" + url,
      type: "GET",
      headers: {
        'Content-Type': 'application/json',
        'Authorization': "Bearer " + token,
      },
      success: function (data) {
        console.log(data);
      },
      error: function (error) {
        console.error('Error:', error);
      }
    });

})();