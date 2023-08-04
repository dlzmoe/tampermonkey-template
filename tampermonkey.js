// ==UserScript==
// @name         Tampermonkey Nmae
// @namespace    https://github.dev/zishume/tampermonkey
// @version      0.0.1
// @description  Tampermonkey description
// @author       zishume
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/chrome/static/images/chrome-logo-m100.svg
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license MIT
// ==/UserScript==

(function() {
  'use strict';
  
  if(location.href === "http://localhost:8080/") return
  let script = document.createElement('script')
  script.src='http://localhost:8080/app.bundle.js'
  document.body.appendChild(script)

})();