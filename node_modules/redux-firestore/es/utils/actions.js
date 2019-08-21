"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.wrapInDispatch = wrapInDispatch;
exports.mapWithFirebaseAndDispatch = mapWithFirebaseAndDispatch;

var _mapValues2 = _interopRequireDefault(require("lodash/mapValues"));

var _isFunction2 = _interopRequireDefault(require("lodash/isFunction"));

var _isObject2 = _interopRequireDefault(require("lodash/isObject"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

function makePayload(_ref, valToPass) {
  var payload = _ref.payload;
  return (0, _isFunction2.default)(payload) ? payload(valToPass) : payload;
}

function wrapInDispatch(dispatch, _ref2) {
  var ref = _ref2.ref,
      _ref2$meta = _ref2.meta,
      meta = _ref2$meta === void 0 ? {} : _ref2$meta,
      method = _ref2.method,
      _ref2$args = _ref2.args,
      args = _ref2$args === void 0 ? [] : _ref2$args,
      types = _ref2.types;

  var _types = _slicedToArray(types, 3),
      requestingType = _types[0],
      successType = _types[1],
      errorType = _types[2];

  dispatch({
    type: (0, _isObject2.default)(requestingType) ? requestingType.type : requestingType,
    meta: meta,
    payload: (0, _isObject2.default)(requestingType) ? requestingType.payload : {
      args: args
    }
  });
  return ref[method].apply(ref, _toConsumableArray(args)).then(function (result) {
    var successIsObject = (0, _isObject2.default)(successType);
    var actionObj = {
      type: successIsObject ? successType.type : successType,
      meta: meta,
      payload: successIsObject && successType.payload ? makePayload(successType, result) : {
        args: args
      }
    };

    if (successIsObject && successType.preserve) {
      actionObj.preserve = successType.preserve;
    }

    if (successIsObject && successType.merge) {
      actionObj.merge = successType.merge;
    }

    dispatch(actionObj);
    return result;
  }).catch(function (err) {
    dispatch({
      type: errorType,
      meta: meta,
      payload: err
    });
    return Promise.reject(err);
  });
}

function createWithFirebaseAndDispatch(firebase, dispatch) {
  return function (func) {
    return function () {
      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return func.apply(firebase, [firebase, dispatch].concat(args));
    };
  };
}

function mapWithFirebaseAndDispatch(firebase, dispatch, actions, aliases) {
  var withFirebaseAndDispatch = createWithFirebaseAndDispatch(firebase, dispatch);
  return _objectSpread({}, (0, _mapValues2.default)(actions, withFirebaseAndDispatch), aliases.reduce(function (acc, _ref3) {
    var action = _ref3.action,
        name = _ref3.name;
    return _objectSpread({}, acc, _defineProperty({}, name, withFirebaseAndDispatch(action)));
  }, {}));
}