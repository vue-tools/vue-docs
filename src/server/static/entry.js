import Vue from 'vue'
import App from './App'
import router from './router'
import Tabs from 'components/tabs'
import Layout from 'components/layout'

Vue.component('Layout', Layout)
Vue.component('vue-doc-tabs', Tabs)

new Vue({
	router,
	...App
}).$mount('#app')