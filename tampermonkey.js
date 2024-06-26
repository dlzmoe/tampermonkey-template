// ==UserScript==
// @name         tampermonkey-template
// @namespace    https://github.com/dlzmoe/tampermonkey-template
// @version      0.0.1
// @description  Tampermonkey description
// @author       tampermonkey-template
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/chrome/static/images/chrome-logo-m100.svg
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license      MIT
// ==/UserScript==

(function () {
  'use strict';
  // 替换
  if (location.href === "http://localhost:8080/") return
  let script = document.createElement('script')
  script.src = 'http://localhost:8080/app.bundle.js'
  document.body.appendChild(script)
  // 替换
})();