// ==UserScript==
// @name        Netlify 汉化脚本
// @namespace   https://github.com/98zi/MyTampermonkey
// @version     0.0.1
// @author      98zi
// @description Netlify 汉化脚本
// @include     *://*/netlify.com/*
// @license     MIT
// @icon        https://app.netlify.com/favicon-48x48.png
// @grant       none
// @run-at      document-start
// ==/UserScript==

const zh_Hans = [
	['Team overview', '团队概况'],
	['Sites', '站点'],
	['Builds', '构建'],
	['Integrations', '集成'],
	['Domains', '域名'],
	['Members', '会员'],
	['Audit log', '审核日志'],
	['Security Scorecard', '安全评分'],
	['Billing', '计费'],
	['Team settings', '团队设置'],
	['Upgrade', '升级'],
	['Bandwidth', '带宽'],
	['Build minutes', '构建时间'],
	['Concurrent builds', '构建并发'],
	['Team members', '团队成员'],
	['Site overview', '概览'],
	['Site configuration', '配置'],
	['Deploys', '部署'],
	['Logs', '日志'],
	['Metrics', '指标'],
	['Domain management', '域名管理'],
	['Forms', '形式'],
	['Favorite site', '收藏站点'],
	['Unfavorite site', '取消收藏'],
	['General', '常规'],
	['Site details', '站点详情'],
	['Status badges', '状态徽章'],
	['Site members', '网站会员'],
	['Danger zone', '危险操作'],
	['Site information', '站点信息'],
	['Site name', '站点名称'],
	['Owner', '所有人'],
	['Site ID', '站点ID'],
	['Created', '创建时间'],
	['Last update', '最后更新'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
	['xxxx', 'xxxx'],
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