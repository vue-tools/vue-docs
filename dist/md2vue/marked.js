'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _stringify = require('babel-runtime/core-js/json/stringify');

var _stringify2 = _interopRequireDefault(_stringify);

exports.default = function (content) {
    content = content + '';
    content = content.replace(/@/g, '__at__');

    return (0, _marked2.default)(content).replace(/__at__/g, '@');
};

var _yamljs = require('yamljs');

var _yamljs2 = _interopRequireDefault(_yamljs);

var _marked = require('marked');

var _marked2 = _interopRequireDefault(_marked);

var _highlight = require('highlight.js');

var _highlight2 = _interopRequireDefault(_highlight);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var plugins = {
    example: function example(marked, code, lang, highlight) {
        return code + '<h2 id="demo">code</h2><pre class="' + this.options.langPrefix + lang + '"><code>' + highlight.highlightAuto(code).value + '</code></pre>';
    },
    interface: function _interface(marked, code, lang, highlight) {
        try {
            return '<vue-doc-tabs :data=\'' + (0, _stringify2.default)(_yamljs2.default.parse(code), null, 2) + '\'></vue-doc-tabs>';
        } catch (e) {
            return 'yaml parse error, check your interface code';
        }
    }
};

_marked2.default.Renderer.prototype.code = function (code, lang, escaped) {
    var plugin = plugins[lang];

    if (!lang) {
        return '<pre><code>' + escape(code, true) + '</code></pre>';
    } else if (lang && isFunction(plugin)) {
        var result = plugin.call(this, _marked2.default, code, lang, _highlight2.default);

        return result ? result : code;
    }

    return '<pre class="' + this.options.langPrefix + escape(lang) + '"><code>' + _highlight2.default.highlightAuto(code).value + '</code></pre>';
};

_marked2.default.setOptions({
    renderer: new _marked2.default.Renderer()
});

function isFunction(obj) {
    return Object.prototype.toString.call(obj) === '[object Function]';
}

function escape(html, encode) {
    return html.replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;').replace(/'/g, '&#39;').replace(!encode ? /&(?!#?\w+;)/g : /&/g, '&amp;');
}