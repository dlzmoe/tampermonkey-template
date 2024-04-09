import Vue from 'vue'
import App from './app.vue'

const root = document.createElement('div')
root.id = 'Tampermonkey'
document.body.appendChild(root)
const vm = new Vue({
  el: '#Tampermonkey',
  render: (h) => h(App),
})
