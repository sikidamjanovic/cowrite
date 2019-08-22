'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.statusReducer = exports.orderedReducer = exports.listenersReducer = exports.errorsReducer = exports.dataReducer = undefined;

var _dataReducer = require('./dataReducer');

var _dataReducer2 = _interopRequireDefault(_dataReducer);

var _errorsReducer = require('./errorsReducer');

var _errorsReducer2 = _interopRequireDefault(_errorsReducer);

var _listenersReducer = require('./listenersReducer');

var _listenersReducer2 = _interopRequireDefault(_listenersReducer);

var _orderedReducer = require('./orderedReducer');

var _orderedReducer2 = _interopRequireDefault(_orderedReducer);

var _statusReducer = require('./statusReducer');

var _statusReducer2 = _interopRequireDefault(_statusReducer);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.dataReducer = _dataReducer2.default;
exports.errorsReducer = _errorsReducer2.default;
exports.listenersReducer = _listenersReducer2.default;
exports.orderedReducer = _orderedReducer2.default;
exports.statusReducer = _statusReducer2.default;
exports.default = {
  dataReducer: _dataReducer2.default,
  errorsReducer: _errorsReducer2.default,
  listenersReducer: _listenersReducer2.default,
  orderedReducer: _orderedReducer2.default,
  statusReducer: _statusReducer2.default
};