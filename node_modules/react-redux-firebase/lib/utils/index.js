'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.stringToDate = exports.wrapDisplayName = exports.getDisplayName = exports.createCallable = exports.getEventsFromInput = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _events = require('./events');

Object.defineProperty(exports, 'getEventsFromInput', {
  enumerable: true,
  get: function get() {
    return _events.getEventsFromInput;
  }
});

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var createCallable = exports.createCallable = function createCallable(f) {
  return (0, _isFunction3.default)(f) ? f : function () {
    return f;
  };
};

var getDisplayName = exports.getDisplayName = function getDisplayName(Component) {
  if (typeof Component === 'string') {
    return Component;
  }

  if (!Component) {
    return undefined;
  }

  return Component.displayName || Component.name || 'Component';
};

var wrapDisplayName = exports.wrapDisplayName = function wrapDisplayName(BaseComponent, hocName) {
  return hocName + '(' + getDisplayName(BaseComponent) + ')';
};

var stringToDate = exports.stringToDate = function stringToDate(strInput) {
  try {
    return new Date(JSON.parse(strInput));
  } catch (err) {
    console.error('Error parsing string to date:', err.message || err);
    return strInput;
  }
};