// ==UserScript==
// @name         谷歌搜索屏蔽指定域名
// @namespace    https://github.com/zburu
// @version      0.0.1
// @description  在谷歌搜索中屏蔽不想看到的域名，比如某csdn
// @author       lovezsh
// @match        https://google.com/*
// @match        https://www.google.com/*
// @icon         https://www.google.com/chrome/static/images/chrome-logo-m100.svg
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license MIT
// ==/UserScript==
 
(function () {
  'use strict';
  $(function () {
    // 生成输入框
    $('body').append('<div id="googlesearchblockurl"></div>')
    $('#googlesearchblockurl').append(`<style>
#googlesearchblockurl {
  position: fixed;
  right: 50px;
  top: 200px;
}
#googlesearchblockurl textarea {
  width: 300px;
  min-height: 140px;
  font-size: 14px;
  font-family: inherit;
}
    </style>`)
    $('#googlesearchblockurl').append('<textarea placeholder="输入想要屏蔽的域名，多个域名直接换行，暂不支持通配符"></textarea><button>保存</button>');
    //
    var googlesearchblockurlData = localStorage.getItem('googlesearchblockurlData');
    if (googlesearchblockurlData) {
 
      var newgooglesearchblockurlData = googlesearchblockurlData.replace(/,/g, "\n");
      $('#googlesearchblockurl textarea').val(newgooglesearchblockurlData);
 
      const googlesearchblockurlDatasite = googlesearchblockurlData.split(",");
      console.log(googlesearchblockurlDatasite);
 
      $('cite').each(function () {
        const citeText = $(this).text();
 
        for (let i = 0; i < googlesearchblockurlDatasite.length; i++) {
          if (citeText.includes(googlesearchblockurlDatasite[i])) {
            $(this).parents('.g').remove();
            return;
          }
        }
      });
 
    }
 
    $('#googlesearchblockurl button').click(function () {
      var googlesearchblockurlData = $('#googlesearchblockurl textarea').val();
      googlesearchblockurlData = googlesearchblockurlData.split("\n");
 
      console.log(googlesearchblockurlData);
 
      localStorage.setItem('googlesearchblockurlData', googlesearchblockurlData);
    })
 
 
  })
})()
