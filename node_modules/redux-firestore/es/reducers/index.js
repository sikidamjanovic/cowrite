"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
Object.defineProperty(exports, "dataReducer", {
  enumerable: true,
  get: function get() {
    return _dataReducer.default;
  }
});
Object.defineProperty(exports, "errorsReducer", {
  enumerable: true,
  get: function get() {
    return _errorsReducer.default;
  }
});
Object.defineProperty(exports, "listenersReducer", {
  enumerable: true,
  get: function get() {
    return _listenersReducer.default;
  }
});
Object.defineProperty(exports, "orderedReducer", {
  enumerable: true,
  get: function get() {
    return _orderedReducer.default;
  }
});
Object.defineProperty(exports, "statusReducer", {
  enumerable: true,
  get: function get() {
    return _statusReducer.default;
  }
});
Object.defineProperty(exports, "queriesReducer", {
  enumerable: true,
  get: function get() {
    return _queriesReducer.default;
  }
});
Object.defineProperty(exports, "crossSliceReducer", {
  enumerable: true,
  get: function get() {
    return _crossSliceReducer.default;
  }
});
exports.default = void 0;

var _dataReducer = _interopRequireDefault(require("./dataReducer"));

var _errorsReducer = _interopRequireDefault(require("./errorsReducer"));

var _listenersReducer = _interopRequireDefault(require("./listenersReducer"));

var _orderedReducer = _interopRequireDefault(require("./orderedReducer"));

var _statusReducer = _interopRequireDefault(require("./statusReducer"));

var _queriesReducer = _interopRequireDefault(require("./queriesReducer"));

var _crossSliceReducer = _interopRequireDefault(require("./crossSliceReducer"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var _default = {
  dataReducer: _dataReducer.default,
  errorsReducer: _errorsReducer.default,
  listenersReducer: _listenersReducer.default,
  orderedReducer: _orderedReducer.default,
  statusReducer: _statusReducer.default,
  queriesReducer: _queriesReducer.default,
  crossSliceReducer: _crossSliceReducer.default
};
exports.default = _default;