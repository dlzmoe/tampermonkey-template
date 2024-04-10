## tampermonkey-scripts

油猴脚本模板，支持热更新，开发更便捷。

## 1. 文件目录

| 路径        | 解释                                                         |
| ----------- | ------------------------------------------------------------ |
| `/src`      | 开发目录                                                     |
| `/template` | 模板文件                                                     |
| `/packages` | 脚本目录(自用的油猴脚本，可能不适用于其他场景，可自行修改。) |

## 2. 开发流程

> **开发环境**  
> Node: 14.15.0

将 `tampermonkey.js` 代码复制到油猴脚本编辑器，然后在本地进行开发，开发完成之然后把 `app.bundle.js` 文件的内容替换到下面标注的文本。

```js
// ==UserScript==
// @name         Tampermonkey Nmae
// @namespace    https://github.com/anghunk/tampermonkey-scripts)
// @version      0.0.1
// @description  Tampermonkey description
// @author       anghunk
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

安装依赖并运行。

```shell
yarn 
yarn dev 
# or
npm install
npm run start
```

本地运行后显示 `Compiled successfully.` 即为成功，打开 `http://localhost:8080/` 可以看到一个示例 demo。

## 3. 参考项目

- https://github.com/kinyaying/wokoo

## 4. LICENSE

[MIT License](./LICENSE)