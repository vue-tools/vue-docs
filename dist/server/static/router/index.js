'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _extends2 = require('babel-runtime/helpers/extends');

var _extends3 = _interopRequireDefault(_extends2);

var _keys = require('babel-runtime/core-js/object/keys');

var _keys2 = _interopRequireDefault(_keys);

var _vue = require('vue');

var _vue2 = _interopRequireDefault(_vue);

var _map = require('./map');

var _map2 = _interopRequireDefault(_map);

var _vueRouter = require('vue-router');

var _vueRouter2 = _interopRequireDefault(_vueRouter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_vue2.default.use(_vueRouter2.default);

var router = new _vueRouter2.default({
    base: '/',
    routes: (0, _keys2.default)(_map2.default).reduce(function (previous, current) {
        return previous.push((0, _extends3.default)({ path: current }, _map2.default[current])) && previous;
    }, []).concat({
        path: '*',
        meta: {
            title: '404 - Not Found'
        },
        component: {
            render: function render(h) {
                return h('h3', { class: 'title-404' }, '404 - Not Found');
            }
        }
    }),
    scrollBehavior: function scrollBehavior(to, from, savedPosition) {
        return { x: 0, y: 0 };
    }
});

router.beforeEach(function (_ref, from, next) {
    var matched = _ref.matched;

    matched.filter(function (_ref2) {
        var meta = _ref2.meta;
        return meta.title;
    }).map(function (_ref3) {
        var meta = _ref3.meta;
        return document.title = meta.title;
    });

    next();
});

exports.default = router;