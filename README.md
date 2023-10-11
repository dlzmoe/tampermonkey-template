## tampermonkey-template

油猴脚本模板，支持热更新，开发更便捷。

## 流程

> **开发环境**  
> Node: 14.15.0

将 `tampermonkey.js` 代码复制到油猴脚本编辑器，然后在本地进行开发，开发完成之然后把 `app.bundle.js` 文件的内容替换到下面标注的文本。

![1697014244069](https://imgurl.zishu.me/images/1697014244069.jpg)


```js
// ==UserScript==
// @name         Tampermonkey Nmae
// @namespace    https://github.com/zishume/tampermonkey-template
// @version      0.0.1
// @description  Tampermonkey description
// @author       zishume
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
```

本地运行后显示 `Compiled successfully.` 即为成功，打开 `http://localhost:8080/` 可以看到一个示例 demo。

```shell
npm install

npm start
```

## 开发脚本

- [https://greasyfork.org/zh-CN/scripts/454963-v2ex图片灯箱插件](https://greasyfork.org/zh-CN/scripts/454963-v2ex%E5%9B%BE%E7%89%87%E7%81%AF%E7%AE%B1%E6%8F%92%E4%BB%B6/code)


## 致谢

- https://github.com/kinyaying/wokoo
