'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

exports.default = function (mdPath) {
    var opts = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    var exclude = void 0,
        watcher = void 0;

    mdPath = (0, _path.resolve)(mdPath);
    exclude = [/node_modules/];

    if (!(0, _fs.existsSync)(mdPath)) {
        _logger2.default.error('markdown file directory not exist');
        return;
    }

    if (opts.exclude) {
        exclude = exclude.concat(opts.exclude);
    }

    watcher = _chokidar2.default.watch(mdPath, { ignored: exclude });
    watcher.on('add', function (path) {
        return correctExt(path) && (0, _utils.add)(path, getPagePath(path));
    });
    watcher.on('change', function (path) {
        return correctExt(path) && (0, _utils.change)(path, getPagePath(path));
    });
    watcher.on('unlink', function (path) {
        return correctExt(path) && (0, _utils.remove)(path, getPagePath(path));
    });
};

var _logger = require('../logger');

var _logger2 = _interopRequireDefault(_logger);

var _chokidar = require('chokidar');

var _chokidar2 = _interopRequireDefault(_chokidar);

var _fs = require('fs');

var _utils = require('./utils');

var _path = require('path');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var STATIC_PATH = '../server/static/';
var PAGE_PATH = (0, _path.resolve)((0, _path.join)(__dirname, STATIC_PATH, 'pages'));

function getPagePath(path) {
    return (0, _path.resolve)((0, _path.join)(PAGE_PATH, (0, _path.basename)(path, '.md') + '.vue'));
}

function correctExt(path) {
    return (0, _path.extname)(path) === '.md';
}