"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _omit2 = _interopRequireDefault(require("lodash/omit"));

var _constants = require("../constants");

var _reducers = require("../utils/reducers");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance"); }

function _iterableToArray(iter) { if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function listenersById() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

  var _ref = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref.type,
      path = _ref.path,
      payload = _ref.payload;

  switch (type) {
    case _constants.actionTypes.SET_LISTENER:
      return _objectSpread({}, state, _defineProperty({}, payload.name, {
        name: payload.name,
        path: path
      }));

    case _constants.actionTypes.UNSET_LISTENER:
      return (0, _omit2.default)(state, [payload.name]);

    default:
      return state;
  }
}

function allListeners() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];

  var _ref2 = arguments.length > 1 ? arguments[1] : undefined,
      type = _ref2.type,
      payload = _ref2.payload;

  switch (type) {
    case _constants.actionTypes.SET_LISTENER:
      return [].concat(_toConsumableArray(state), [payload.name]);

    case _constants.actionTypes.UNSET_LISTENER:
      return state.filter(function (name) {
        return name !== payload.name;
      });

    default:
      return state;
  }
}

var listenersReducer = (0, _reducers.combineReducers)({
  byId: listenersById,
  allIds: allListeners
});
var _default = listenersReducer;
exports.default = _default;