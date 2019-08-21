'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.recursiveUnset = exports.preserveValuesFromState = exports.combineReducers = undefined;

var _unset2 = require('lodash/fp/unset');

var _unset3 = _interopRequireDefault(_unset2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _isBoolean2 = require('lodash/isBoolean');

var _isBoolean3 = _interopRequireDefault(_isBoolean2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _replace2 = require('lodash/replace');

var _replace3 = _interopRequireDefault(_replace2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

exports.pathToArr = pathToArr;
exports.getSlashStrPath = getSlashStrPath;
exports.getDotStrPath = getDotStrPath;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function pathToArr(path) {
  return path ? path.split(/\//).filter(function (p) {
    return !!p;
  }) : [];
}

function getSlashStrPath(path) {
  return pathToArr(path).join('/');
}

function getDotStrPath(path) {
  return pathToArr(path).join('.');
}

var combineReducers = exports.combineReducers = function combineReducers(reducers) {
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];
    return Object.keys(reducers).reduce(function (nextState, key) {
      nextState[key] = reducers[key](state[key], action);
      return nextState;
    }, {});
  };
};

var preserveValuesFromState = exports.preserveValuesFromState = function preserveValuesFromState(state, preserveSetting, nextState) {
  if ((0, _isFunction3.default)(preserveSetting)) {
    return preserveSetting(state, nextState);
  }

  if ((0, _isBoolean3.default)(preserveSetting) && preserveSetting) {
    return nextState ? _extends({}, state, nextState) : state;
  }

  if ((0, _isArray3.default)(preserveSetting)) {
    return (0, _pick3.default)(state, preserveSetting);
  }

  throw new Error('Invalid preserve parameter. It must be an Object or an Array');
};

var recursiveUnset = exports.recursiveUnset = function recursiveUnset(path, obj) {
  var isRecursiveCall = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!path) {
    return obj;
  }

  if ((0, _size3.default)((0, _get3.default)(obj, path)) > 0 && isRecursiveCall) {
    return obj;
  }

  var objectWithRemovedKey = (0, _unset3.default)(path, obj);
  var newPath = path.match(/\./) ? (0, _replace3.default)(path, /\.[^.]*$/, '') : '';
  return recursiveUnset(newPath, objectWithRemovedKey, true);
};