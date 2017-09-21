'use strict';

var _promise = require('babel-runtime/core-js/promise');

var _promise2 = _interopRequireDefault(_promise);

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _getIterator2 = require('babel-runtime/core-js/get-iterator');

var _getIterator3 = _interopRequireDefault(_getIterator2);

var _assign = require('babel-runtime/core-js/object/assign');

var _assign2 = _interopRequireDefault(_assign);

var _koa = require('koa');

var _koa2 = _interopRequireDefault(_koa);

var _path = require('path');

var _path2 = _interopRequireDefault(_path);

var _webpack = require('webpack');

var _webpack2 = _interopRequireDefault(_webpack);

var _webpackMerge = require('webpack-merge');

var _webpackMerge2 = _interopRequireDefault(_webpackMerge);

var _webpackDocs = require('./webpack.docs.conf');

var _webpackDocs2 = _interopRequireDefault(_webpackDocs);

var _koaWebpackDevMiddleware = require('koa-webpack-dev-middleware');

var _koaWebpackDevMiddleware2 = _interopRequireDefault(_koaWebpackDevMiddleware);

var _koaWebpackHotMiddleware = require('koa-webpack-hot-middleware');

var _koaWebpackHotMiddleware2 = _interopRequireDefault(_koaWebpackHotMiddleware);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _marked = /*#__PURE__*/_regenerator2.default.mark(readFile);

module.exports = function (userWebpackConfig) {
    var compiler = void 0,
        app = void 0,
        webpackConfig = void 0;

    app = (0, _koa2.default)();
    webpackConfig = (0, _webpackMerge2.default)(_webpackDocs2.default, userWebpackConfig);

    webpackConfig.plugins = webpackConfig.plugins || [];
    webpackConfig.devServer = (0, _assign2.default)({}, webpackConfig.devServer, {
        hot: true,
        publicPath: webpackConfig.output.publicPath
    });

    if (Array.isArray(webpackConfig.entry)) {
        webpackConfig.entry.unshift('webpack-hot-middleware/client');
    } else {
        var _iteratorNormalCompletion = true;
        var _didIteratorError = false;
        var _iteratorError = undefined;

        try {
            for (var _iterator = (0, _getIterator3.default)((0, _keys2.default)(webpackConfig.entry)), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                var key = _step.value;

                webpackConfig.entry[key].unshift('webpack-hot-middleware/client?reload=true');
            }
        } catch (err) {
            _didIteratorError = true;
            _iteratorError = err;
        } finally {
            try {
                if (!_iteratorNormalCompletion && _iterator.return) {
                    _iterator.return();
                }
            } finally {
                if (_didIteratorError) {
                    throw _iteratorError;
                }
            }
        }
    }

    webpackConfig.plugins.unshift(new _webpack2.default.HotModuleReplacementPlugin());
    webpackConfig.plugins.unshift(new _webpack2.default.NoErrorsPlugin());

    compiler = (0, _webpack2.default)(webpackConfig);

    app.use(webpackDevServer(compiler, webpackConfig.devServer));
    app.use( /*#__PURE__*/_regenerator2.default.mark(function _callee(next) {
        return _regenerator2.default.wrap(function _callee$(_context) {
            while (1) {
                switch (_context.prev = _context.next) {
                    case 0:
                        this.type = 'text/html';
                        _context.next = 3;
                        return readFile(compiler, _path2.default.join(compiler.outputPath, 'index.html'));

                    case 3:
                        this.body = _context.sent;

                    case 4:
                    case 'end':
                        return _context.stop();
                }
            }
        }, _callee, this);
    }));

    return {
        listen: function listen(port, callback) {
            app.listen(port, callback || function (err) {
                if (err) {
                    console.log(err);
                    return;
                }
            });
        }
    };
};

function webpackDevServer(compiler, devServer) {
    var hotOptions = {
        log: function log() {}
    };

    return compose([(0, _koaWebpackDevMiddleware2.default)(compiler, devServer), (0, _koaWebpackHotMiddleware2.default)(compiler, hotOptions)]);
}

function compose(middleware) {
    return (/*#__PURE__*/_regenerator2.default.mark(function _callee2(next) {
            var i;
            return _regenerator2.default.wrap(function _callee2$(_context3) {
                while (1) {
                    switch (_context3.prev = _context3.next) {
                        case 0:
                            if (!next) {
                                next = /*#__PURE__*/_regenerator2.default.mark(function noop() {
                                    return _regenerator2.default.wrap(function noop$(_context2) {
                                        while (1) {
                                            switch (_context2.prev = _context2.next) {
                                                case 0:
                                                case 'end':
                                                    return _context2.stop();
                                            }
                                        }
                                    }, noop, this);
                                });
                            }

                            i = middleware.length;


                            while (i--) {
                                next = middleware[i].call(this, next);
                            }

                            return _context3.delegateYield(next, 't0', 4);

                        case 4:
                            return _context3.abrupt('return', _context3.t0);

                        case 5:
                        case 'end':
                            return _context3.stop();
                    }
                }
            }, _callee2, this);
        })
    );
}

function readFile(compiler, filepath) {
    return _regenerator2.default.wrap(function readFile$(_context4) {
        while (1) {
            switch (_context4.prev = _context4.next) {
                case 0:
                    return _context4.abrupt('return', new _promise2.default(function (resolve, reject) {
                        compiler.outputFileSystem.readFile(filepath, function (err, result) {
                            if (err) {
                                reject(err);
                                return;
                            }

                            resolve(result);
                        });
                    }));

                case 1:
                case 'end':
                    return _context4.stop();
            }
        }
    }, _marked, this);
}