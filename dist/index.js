'use strict';

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _md2vue = require('./md2vue');

var _md2vue2 = _interopRequireDefault(_md2vue);

var _logger = require('./logger');

var _logger2 = _interopRequireDefault(_logger);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _fs = require('fs');

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _server = require('./server');

var _server2 = _interopRequireDefault(_server);

var _package = require('../package');

var _package2 = _interopRequireDefault(_package);

var _path = require('path');

var _webpackBuild = require('./server/webpack.build.conf');

var _webpackBuild2 = _interopRequireDefault(_webpackBuild);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var args = void 0,
    action = void 0,
    cwd = void 0,
    config = void 0,
    configFile = void 0;

args = process.argv.slice(2);
action = args.shift();
cwd = process.cwd();
configFile = (0, _path.resolve)((0, _path.join)(cwd, args.length ? args.shift() : './docs.conf.js'));

config = {
    port: 8888,
    webpack: {},
    md: { dir: cwd, exclude: '' },
    vue: { dir: (0, _path.join)(cwd, 'build') }
};

if ((0, _fs.existsSync)(configFile)) {
    config = (0, _assign2.default)({}, config, require(configFile));
}

config.md.dir = (0, _path.resolve)((0, _path.join)(cwd, config.md.dir));
config.vue.dir = (0, _path.resolve)((0, _path.join)(cwd, config.vue.dir));

if (action === 'start') {
    _logger2.default.info('Vue-docs v' + _package2.default.version + ' server started at http://0.0.0.0:' + config.port);
    _logger2.default.info('vue file directory at ' + config.vue.dir);
    _logger2.default.info('markdown file directory at ' + config.md.dir);

    (0, _md2vue2.default)(config.md.dir, config.md);
    (0, _server2.default)(config.webpack).listen(config.port);
} else if (action === 'build') {
    (0, _webpack2.default)((0, _webpackMerge2.default)(_webpackBuild2.default, config.webpack, {
        output: {
            path: config.vue.dir
        }
    }), function (err, stats) {
        if (err) {
            console.log(err);
        }
    });
}