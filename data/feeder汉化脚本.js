// ==UserScript==
// @name        feeder汉化脚本
// @namespace   https://github.com/98zi/MyTampermonkey
// @version     0.0.1
// @author      98zi
// @description feeder.com 汉化脚本
// @include     *://feeder.co/*
// @license     MIT
// @icon        https://feeder.co/favicon.ico
// @grant       none
// @run-at      document-start
// @downloadURL https://update.greasyfork.org/scripts/481157/feeder%E6%B1%89%E5%8C%96%E8%84%9A%E6%9C%AC.user.js
// @updateURL https://update.greasyfork.org/scripts/481157/feeder%E6%B1%89%E5%8C%96%E8%84%9A%E6%9C%AC.meta.js
// ==/UserScript==

const zh_Hans = [
	['All feeds', '全部订阅'],
	['Unread', '未读'],
	['Starred', '星标'],
	['Home', '首页'],
	['Dashboard', '图表'],
	['Rules', '规则'],
	['Team', '团队'],
	['Library', '列表'],
	['Account', '账户'],
	['Help', '帮助'],
	['Collapse', '收起'],
	['Reload feeds', '重新加载源数据'],
	['Open all unread...', '打开所有未读'],
	['Mark all as read', '全部标为已读'],
	['Mark feed as read', '将 feed 标为已读'],
	['Export posts', '导出帖子'],
	['Go to page', '跳转到网站'],
	['Edit feed', '编辑 feed'],
	['Delete feed', '删除 feed'],
	['Filters', '过滤'],
	['Display', '展示'],
	['Order', '排序'],
	['Newest first', '最新'],
	['Oldest first', '最旧'],
	['Realtime', '实时'],
	['Auto-update', '自动更新'],
	['Content style', '风格'],
	['Timestamp', '时间戳'],
	['Previous post', '上一篇'],
	['Next post', '下一篇'],
	['Share post', '分享'],
	['Mark as unread', '标记为已读'],
	['Star post', '收藏'],
	['Toggle collections', '切换集合'],
	['Simple', '简单布局'],
	['Full', '源站布局'],
	['Free ', '免费'],
	['My account ', '我的账户'],
	['Settings ', '设置'],
];

class ReplaceText {
	constructor(i18n, mode = 'equal') {
		this.W = typeof unsafeWindow === 'undefined' ? window : unsafeWindow;
		this.done = new Set();
		this.alert = this.W.alert.bind(this.W);
		this.confirm = this.W.confirm.bind(this.W);
		this.prompt = this.W.prompt.bind(this.W);
		const i18nMap = new Map(i18n);
		const i18nArr = i18n.map(value => value[0]);
		if (mode === 'regexp') {
			this.textReplace = (text) => {
				if (i18nMap.has(text))
					text = i18nMap.get(text);
				else {
					const key = i18nArr.find(key => (key instanceof RegExp && text.match(key) !== null));
					if (key !== undefined)
						text = text.replace(key, i18nMap.get(key));
				}
				return text;
			};
		} else if (mode === 'match') {
			this.textReplace = (text) => {
				const key = i18nArr.find(key => (text.match(key) !== null));
				if (key !== undefined)
					text = text.replace(key, i18nMap.get(key));
				return text;
			};
		} else {
			this.textReplace = (text) => {
				if (i18nMap.has(text))
					text = i18nMap.get(text);
				return text;
			};
		}
		this.replaceAlert();
		this.replaceObserver();
	}
	replaceAlert() {
		this.W.alert = (message) => this.alert(this.textReplace(message));
		this.W.confirm = (message) => this.confirm(this.textReplace(message));
		this.W.prompt = (message, _default) => this.prompt(this.textReplace(message), _default);
	}
	replaceNode(node, self = false) {
		const list = this.getReplaceList(node, self);
		for (let index in list) {
			list[index].forEach(node => {
				if (this.done.has(node[index]))
					return;
				const newText = this.textReplace(node[index]);
				if (node[index] !== newText) {
					this.done.add(newText);
					node[index] = newText;
				}
			});
		}
	}
	replaceObserver() {
		const bodyObserver = new MutationObserver(mutations => {
			mutations.forEach(mutation => {
				if (mutation.type === 'attributes' || mutation.type === 'characterData')
					this.replaceNode(mutation.target, true);
				else if (mutation.type === 'childList') {
					mutation.addedNodes.forEach(addedNode => this.replaceNode(addedNode));
				}
			});
		});
		document.addEventListener('readystatechange', () => {
			bodyObserver.observe(document.body, {
				attributes: true,
				characterData: true,
				childList: true,
				subtree: true
			});
			this.replaceNode(document.body);
		}, {
			capture: true,
			once: true
		});
	}
	getReplaceList(node, self = false) {
		const list = {
			data: new Set(),
			placeholder: new Set(),
			title: new Set(),
			value: new Set(),
		};
		const nodeList = self ? [node] : this.nodeForEach(node);
		nodeList.forEach(node => {
			if (node.parentElement instanceof HTMLScriptElement || node.parentElement instanceof HTMLStyleElement)
				return;
			if (node instanceof HTMLElement && node.title !== '')
				list.title.add(node);
			if (node instanceof HTMLInputElement && ['button', 'reset', 'submit'].includes(node.type) && node.value !== '')
				list.value.add(node);
			else if (node instanceof HTMLInputElement || node instanceof HTMLTextAreaElement && node.placeholder !== '')
				list.placeholder.add(node);
			else if (node instanceof Text)
				list.data.add(node);
		});
		return list;
	}
	nodeForEach(node) {
		const list = [];
		list.push(node);
		if (node.hasChildNodes())
			node.childNodes.forEach(child => list.push(...this.nodeForEach(child)));
		return list;
	}
}

new ReplaceText(zh_Hans, 'regexp');