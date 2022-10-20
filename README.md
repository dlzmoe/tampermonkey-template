# tampermonkey
一个油猴脚本模板，复制编写即可。

```js
// ==UserScript==
// @name         Tampermonkey Nmae
// @namespace    https://github.com/zburu
// @version      0.0.1
// @description  Tampermonkey description
// @author       zburu
// @match        http://*/*
// @match        https://*/*
// @icon         https://www.google.com/chrome/static/images/chrome-logo-m100.svg
// @require      https://cdn.bootcss.com/jquery/3.6.0/jquery.min.js
// @grant        none
// @license MIT
// ==/UserScript==

(function () {
  'use strict';
  $(function(){
    console.log('tampermonkey')
  })
})()
```
