'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _log4js = require('log4js');

var _log4js2 = _interopRequireDefault(_log4js);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

_log4js2.default.configure({
    appenders: [{
        type: 'console',
        layout: {
            type: 'pattern',
            pattern: '%[%d{DATE}:%p [%c]: %]%m'
        }
    }]
});

exports.default = _log4js2.default.getLogger('vue-docs');