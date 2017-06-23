'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.add = add;
exports.change = change;
exports.remove = remove;

var _marked = require('./marked');

var _marked2 = _interopRequireDefault(_marked);

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _domParser = require('dom-parser');

var _domParser2 = _interopRequireDefault(_domParser);

var _path = require('path');

var _fs = require('fs');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATIC_PATH = '../server/static/';
var DOC_PATH = (0, _path.resolve)((0, _path.join)(__dirname, STATIC_PATH, 'docs'));
var ROUTER_FILE_PATH = (0, _path.resolve)((0, _path.join)(__dirname, STATIC_PATH, 'router/map.js'));

var routerCode = ['module.exports = {\n', '}'];

function add(targetPath, destPath) {
    var name = void 0,
        docPath = void 0;

    name = (0, _path.basename)(targetPath);
    _logger2.default.info(name + ' file is added to watcher');

    name = (0, _path.basename)(targetPath, '.md');
    docPath = (0, _path.resolve)((0, _path.join)(DOC_PATH, name + '.vue'));

    (0, _fs.writeFileSync)(docPath, md2vue(targetPath));
    (0, _fs.writeFileSync)(destPath, generateVueCode(name));
    (0, _fs.writeFileSync)(ROUTER_FILE_PATH, generateRouterCode(name, 'add'));
}

function change(targetPath, destPath) {
    var name = void 0,
        docPath = void 0;

    name = (0, _path.basename)(targetPath);
    _logger2.default.info(name + ' file is change');

    name = (0, _path.basename)(targetPath, '.md');
    docPath = (0, _path.resolve)((0, _path.join)(DOC_PATH, name + '.vue'));

    (0, _fs.writeFileSync)(docPath, md2vue(targetPath));
    (0, _fs.writeFileSync)(destPath, generateVueCode(name));
}

function remove(targetPath, destPath) {
    var name = void 0,
        docPath = void 0;

    name = (0, _path.basename)(targetPath);
    _logger2.default.info(name + ' file was deleted by watcher');

    name = (0, _path.basename)(targetPath, '.md');
    docPath = (0, _path.resolve)((0, _path.join)(DOC_PATH, name + '.vue'));

    (0, _fs.writeFileSync)(ROUTER_FILE_PATH, generateRouterCode(name, 'remove'));
    (0, _fs.unlinkSync)(docPath);
    (0, _fs.unlinkSync)(destPath);
}

function md2vue(targetPath) {
    var content = (0, _fs.readFileSync)(targetPath);

    return toVue((0, _marked2.default)(content));
}

function generateRouterCode(name, op) {
    var template = routerTemplate(encodeURIComponent(name));

    if (op === 'add') {
        routerCode.splice(-1, 0, template);
    }

    if (op === 'remove') {
        for (var index = 1; index < routerCode.length; index++) {
            if (routerCode[index] === template) {
                routerCode.splice(index, 1);
                break;
            }
        }
    }

    return routerCode.join('');
}

function generateVueCode(name) {
    return vueTemplate(name, capitalize(name));
}

function routerTemplate(name) {
    return '    \'/' + name + '\': { meta: { title: \'' + name + '\' }, component: function (resolve) { require([\'pages/' + name + '\'], resolve) }},\n';
}

function vueTemplate(name, componentName) {
    return '<template>\n    <Layout>\n        <' + componentName + '></' + componentName + '>\n    </Layout>\n</template>\n\n<script>\n    import ' + componentName + ' from \'docs/' + name + '\'\n\n    export default {\n        components: {\n            ' + componentName + '\n        }\n    }\n</script>';
}

function toVue(content) {
    var parser = void 0,
        dom = void 0,
        style = void 0,
        script = void 0,
        reg = void 0,
        result = void 0;

    parser = new _domParser2.default();
    dom = parser.parseFromString(content);
    style = dom.getElementsByTagName('style')[0];
    script = dom.getElementsByTagName('script')[0];

    reg = {
        style: /<style\b[^<]*(?:(?!<\/style>)<[^<]*)*<\/style>/gi,
        script: /<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi
    };

    result = '<template>\n    <section>\n' + content.replace(reg.style, '').replace(reg.script, '') + '\n    </section>\n</template>';

    if (style) {
        result += '\n<style>\n' + style.innerHTML + '\n</style>';
    }

    if (script) {
        result += '\n<script>\n' + script.innerHTML + '\n</script>';
    }

    return result;
}

function capitalize(str) {
    return typeof str === 'string' ? str[0].toUpperCase() + str.slice(1) : str;
}