'use strict';

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _App = require('./App');

var _App2 = _interopRequireDefault(_App);

var _router = require('./router');

var _router2 = _interopRequireDefault(_router);

var _tabs = require('components/tabs');

var _tabs2 = _interopRequireDefault(_tabs);

var _layout = require('components/layout');

var _layout2 = _interopRequireDefault(_layout);

var _config = require('../config');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var runtime = void 0;

if ('serviceWorker' in navigator && process.env[_config.serviceWorkerConfig.ENABLE_KEY]) {
    runtime = require('serviceworker-webpack-plugin/lib/runtime');
    runtime.register();
}

_vue2.default.component('Layout', _layout2.default);
_vue2.default.component('vue-doc-tabs', _tabs2.default);

new _vue2.default((0, _extends3.default)({
    router: _router2.default
}, _App2.default)).$mount('#app');