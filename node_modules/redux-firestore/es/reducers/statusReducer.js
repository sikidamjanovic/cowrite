"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.requestingReducer = requestingReducer;
exports.requestedReducer = requestedReducer;
exports.timestampsReducer = timestampsReducer;
exports.default = void 0;

var _constants = require("../constants");

var _reducers = require("../utils/reducers");

var _query = require("../utils/query");

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var SET_LISTENER = _constants.actionTypes.SET_LISTENER,
    LISTENER_ERROR = _constants.actionTypes.LISTENER_ERROR,
    LISTENER_RESPONSE = _constants.actionTypes.LISTENER_RESPONSE;

function requestingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      meta = _ref.meta;

  switch (type) {
    case SET_LISTENER:
      return _objectSpread({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)((0, _query.getQueryName)(meta)), true));

    case LISTENER_ERROR:
    case LISTENER_RESPONSE:
      return _objectSpread({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)((0, _query.getQueryName)(meta)), false));

    default:
      return state;
  }
}

function requestedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      meta = _ref2.meta;

  switch (type) {
    case SET_LISTENER:
      return _objectSpread({}, state, _defineProperty({}, (0, _query.getQueryName)(meta), false));

    case LISTENER_ERROR:
    case LISTENER_RESPONSE:
      return _objectSpread({}, state, _defineProperty({}, (0, _query.getQueryName)(meta), true));

    default:
      return state;
  }
}

function timestampsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref3 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref3.type,
      meta = _ref3.meta;

  switch (type) {
    case SET_LISTENER:
      return _objectSpread({}, state, _defineProperty({}, (0, _query.getQueryName)(meta), Date.now()));

    default:
      return state;
  }
}

var _default = (0, _reducers.combineReducers)({
  requesting: requestingReducer,
  requested: requestedReducer,
  timestamps: timestampsReducer
});

exports.default = _default;