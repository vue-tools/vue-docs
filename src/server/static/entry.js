import Vue from 'vue'
import App from './App'
import router from './router'
import Tabs from 'components/tabs'
import Layout from 'components/layout'
import { serviceWorkerConfig } from '../config'

let runtime

if (('serviceWorker' in navigator) && process.env[serviceWorkerConfig.ENABLE_KEY]) {
    runtime = require('serviceworker-webpack-plugin/lib/runtime')
    runtime.register()
}

Vue.component('Layout', Layout)
Vue.component('vue-doc-tabs', Tabs)

new Vue({
    router,
    ...App
}).$mount('#app')