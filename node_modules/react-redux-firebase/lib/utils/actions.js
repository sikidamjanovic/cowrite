'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.mapWithFirebaseAndDispatch = exports.wrapInDispatch = undefined;

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

var wrapInDispatch = exports.wrapInDispatch = function wrapInDispatch(dispatch, _ref) {
  var ref = _ref.ref,
      meta = _ref.meta,
      method = _ref.method,
      _ref$args = _ref.args,
      args = _ref$args === undefined ? [] : _ref$args,
      types = _ref.types;

  var _types = _slicedToArray(types, 3),
      requestingType = _types[0],
      successType = _types[1],
      errorType = _types[2];

  dispatch({
    type: (0, _isObject3.default)(requestingType) ? requestingType.type : requestingType,
    meta: meta,
    payload: (0, _isObject3.default)(requestingType) ? requestingType.payload : { args: args }
  });
  return method.apply(undefined, _toConsumableArray(args)).then(function (payload) {
    dispatch({
      type: (0, _isObject3.default)(successType) ? successType.type : successType,
      meta: meta,
      payload: (0, _isObject3.default)(successType) ? successType.payload : payload
    });
    return payload;
  }).catch(function (err) {
    dispatch({
      type: errorType,
      meta: meta,
      payload: err
    });
    return Promise.reject(err);
  });
};

var createWithFirebaseAndDispatch = function createWithFirebaseAndDispatch(firebase, dispatch, dispatchFirst) {
  return function (func) {
    return function () {
      for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return func.apply(firebase, dispatchFirst ? [dispatch, firebase].concat(args) : [firebase, dispatch].concat(args));
    };
  };
};

var mapWithFirebaseAndDispatch = exports.mapWithFirebaseAndDispatch = function mapWithFirebaseAndDispatch(firebase, dispatch, actions) {
  var aliases = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : [];

  var withFirebaseAndDispatch = createWithFirebaseAndDispatch(firebase, dispatch);
  return _extends({}, (0, _mapValues3.default)(actions, withFirebaseAndDispatch), aliases.reduce(function (acc, _ref2) {
    var action = _ref2.action,
        name = _ref2.name;
    return _extends({}, acc, _defineProperty({}, name, withFirebaseAndDispatch(action)));
  }, {}));
};