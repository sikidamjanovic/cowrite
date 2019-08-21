"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _constants = require("../constants");

var _query = require("../utils/query");

var _reducers = require("../utils/reducers");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

var CLEAR_ERRORS = _constants.actionTypes.CLEAR_ERRORS,
    CLEAR_ERROR = _constants.actionTypes.CLEAR_ERROR,
    LISTENER_ERROR = _constants.actionTypes.LISTENER_ERROR,
    ERROR = _constants.actionTypes.ERROR;

function errorsAllIds() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      meta = _ref.meta,
      type = _ref.type;

  switch (type) {
    case LISTENER_ERROR:
    case ERROR:
      if (state.indexOf((0, _query.getQueryName)(meta)) !== -1) {
        return state;
      }

      return [].concat(_toConsumableArray(state), [(0, _query.getQueryName)(meta)]);

    case CLEAR_ERRORS:
      return [];

    case CLEAR_ERROR:
      return state.filter(function (lId) {
        return lId !== (0, _query.getQueryName)(meta);
      });

    default:
      return state;
  }
}

function errorsByQuery() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      meta = _ref2.meta,
      payload = _ref2.payload,
      type = _ref2.type;

  switch (type) {
    case ERROR:
    case LISTENER_ERROR:
      return _objectSpread({}, state, _defineProperty({}, (0, _query.getQueryName)(meta), payload));

    case CLEAR_ERROR:
      return _objectSpread({}, state, _defineProperty({}, (0, _query.getQueryName)(meta), null));

    default:
      return state;
  }
}

var errorsReducer = (0, _reducers.combineReducers)({
  byQuery: errorsByQuery,
  allIds: errorsAllIds
});
var _default = errorsReducer;
exports.default = _default;