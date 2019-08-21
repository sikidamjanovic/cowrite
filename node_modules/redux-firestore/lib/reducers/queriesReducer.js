"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = queriesReducer;
exports.isComposable = void 0;

var _unset2 = _interopRequireDefault(require("lodash/unset"));

var _get2 = _interopRequireDefault(require("lodash/get"));

var _set2 = _interopRequireDefault(require("lodash/set"));

var _immer = _interopRequireDefault(require("immer"));

var _constants = require("../constants");

var _query = require("../utils/query");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var isComposable = function isComposable(action) {
  return (0, _get2.default)(action, 'meta.where') && (0, _get2.default)(action, 'meta.collection');
};

exports.isComposable = isComposable;

function queriesReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var action = arguments.length > 1 ? arguments[1] : undefined;
  return (0, _immer.default)(state, function (draft) {
    if (!isComposable(action)) {
      return state;
    }

    var key = (0, _query.getBaseQueryName)(action.meta);

    switch (action.type) {
      case _constants.actionTypes.GET_SUCCESS:
      case _constants.actionTypes.LISTENER_RESPONSE:
        draft[key] = _objectSpread({
          data: action.payload.data
        }, action.meta);
        return draft;

      case _constants.actionTypes.UNSET_LISTENER:
        if (draft[key]) {
          draft[key].data = undefined;
        }

        return draft;

      case _constants.actionTypes.DOCUMENT_ADDED:
      case _constants.actionTypes.DOCUMENT_MODIFIED:
        (0, _set2.default)(draft, [key, 'data', action.meta.doc], action.payload.data);
        return draft;

      case _constants.actionTypes.DOCUMENT_REMOVED:
      case _constants.actionTypes.DELETE_SUCCESS:
        (0, _unset2.default)(draft, [key, 'data', action.meta.doc]);
        return draft;

      default:
        return state;
    }
  });
}