'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.orderedReducer = exports.dataReducer = exports.listenersReducer = exports.errorsReducer = exports.profileReducer = exports.authErrorReducer = exports.authReducer = exports.timestampsReducer = exports.requestedReducer = exports.requestingReducer = exports.isInitializingReducer = undefined;

var _assign2 = require('lodash/fp/assign');

var _assign3 = _interopRequireDefault(_assign2);

var _setWith2 = require('lodash/fp/setWith');

var _setWith3 = _interopRequireDefault(_setWith2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _omit2 = require('lodash/omit');

var _omit3 = _interopRequireDefault(_omit2);

var _pick2 = require('lodash/pick');

var _pick3 = _interopRequireDefault(_pick2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _reducers = require('./utils/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var START = _constants.actionTypes.START,
    SET = _constants.actionTypes.SET,
    SET_PROFILE = _constants.actionTypes.SET_PROFILE,
    MERGE = _constants.actionTypes.MERGE,
    LOGIN = _constants.actionTypes.LOGIN,
    LOGOUT = _constants.actionTypes.LOGOUT,
    LOGIN_ERROR = _constants.actionTypes.LOGIN_ERROR,
    CLEAR_ERRORS = _constants.actionTypes.CLEAR_ERRORS,
    REMOVE = _constants.actionTypes.REMOVE,
    NO_VALUE = _constants.actionTypes.NO_VALUE,
    SET_LISTENER = _constants.actionTypes.SET_LISTENER,
    UNSET_LISTENER = _constants.actionTypes.UNSET_LISTENER,
    AUTHENTICATION_INIT_STARTED = _constants.actionTypes.AUTHENTICATION_INIT_STARTED,
    AUTHENTICATION_INIT_FINISHED = _constants.actionTypes.AUTHENTICATION_INIT_FINISHED,
    AUTH_EMPTY_CHANGE = _constants.actionTypes.AUTH_EMPTY_CHANGE,
    AUTH_LINK_SUCCESS = _constants.actionTypes.AUTH_LINK_SUCCESS,
    UNAUTHORIZED_ERROR = _constants.actionTypes.UNAUTHORIZED_ERROR,
    AUTH_UPDATE_SUCCESS = _constants.actionTypes.AUTH_UPDATE_SUCCESS,
    AUTH_RELOAD_SUCCESS = _constants.actionTypes.AUTH_RELOAD_SUCCESS,
    PROFILE_UPDATE_SUCCESS = _constants.actionTypes.PROFILE_UPDATE_SUCCESS;
var isInitializingReducer = exports.isInitializingReducer = function isInitializingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
  var action = arguments[1];

  switch (action.type) {
    case AUTHENTICATION_INIT_STARTED:
      return true;
    case AUTHENTICATION_INIT_FINISHED:
      return false;
    default:
      return state;
  }
};

var requestingReducer = exports.requestingReducer = function requestingReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref = arguments[1];
  var type = _ref.type,
      path = _ref.path;

  switch (type) {
    case START:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), true));
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), false));
    default:
      return state;
  }
};

var requestedReducer = exports.requestedReducer = function requestedReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref2 = arguments[1];
  var type = _ref2.type,
      path = _ref2.path;

  switch (type) {
    case START:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), false));
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), true));
    default:
      return state;
  }
};

var timestampsReducer = exports.timestampsReducer = function timestampsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref3 = arguments[1];
  var type = _ref3.type,
      path = _ref3.path;

  switch (type) {
    case START:
    case NO_VALUE:
    case SET:
      return _extends({}, state, _defineProperty({}, (0, _reducers.getSlashStrPath)(path), Date.now()));
    default:
      return state;
  }
};

var createDataReducer = function createDataReducer() {
  var actionKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'data';
  return function () {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
    var action = arguments[1];

    switch (action.type) {
      case SET:
        return (0, _setWith3.default)(Object, (0, _reducers.getDotStrPath)(action.path), action[actionKey], state);
      case MERGE:
        var previousData = (0, _get3.default)(state, (0, _reducers.getDotStrPath)(action.path), {});
        var mergedData = (0, _assign3.default)(previousData, action[actionKey]);
        return (0, _setWith3.default)(Object, (0, _reducers.getDotStrPath)(action.path), mergedData, state);
      case NO_VALUE:
        return (0, _setWith3.default)(Object, (0, _reducers.getDotStrPath)(action.path), null, state);
      case REMOVE:
        if (actionKey === 'data') {
          return (0, _reducers.recursiveUnset)((0, _reducers.getDotStrPath)(action.path), state);
        }
        return state;
      case LOGOUT:
        if (action.preserve) {
          if ((0, _isArray3.default)(action.preserve)) {
            return (0, _pick3.default)(state, action.preserve);
          } else if ((0, _isObject3.default)(action.preserve)) {
            return action.preserve[actionKey] ? (0, _reducers.preserveValuesFromState)(state, action.preserve[actionKey], {}) : {};
          }
          throw new Error('Invalid preserve parameter. It must be an Object or an Array');
        }
        return {};
      default:
        return state;
    }
  };
};

var authReducer = exports.authReducer = function authReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isLoaded: false, isEmpty: true };
  var action = arguments[1];

  switch (action.type) {
    case LOGIN:
    case AUTH_UPDATE_SUCCESS:
      if (!action.auth) {
        return {
          isEmpty: true,
          isLoaded: true
        };
      }
      var auth = action.auth.toJSON ? action.auth.toJSON() : action.auth;

      if (action.preserve && action.preserve.auth) {
        return (0, _reducers.preserveValuesFromState)(state, action.preserve.auth, _extends({}, auth, {
          isEmpty: false,
          isLoaded: true
        }));
      }
      return _extends({}, auth, { isEmpty: false, isLoaded: true });
    case AUTH_LINK_SUCCESS:
    case AUTH_RELOAD_SUCCESS:
      if (!action.payload) {
        return {
          isEmpty: true,
          isLoaded: true
        };
      }
      return _extends({}, action.payload.toJSON ? action.payload.toJSON() : action.payload, {
        isEmpty: false,
        isLoaded: true
      });
    case LOGIN_ERROR:
    case AUTH_EMPTY_CHANGE:
    case LOGOUT:
      if (action.preserve && action.preserve.auth) {
        return (0, _reducers.preserveValuesFromState)(state, action.preserve.auth, {
          isLoaded: true,
          isEmpty: true
        });
      }
      return { isLoaded: true, isEmpty: true };
    default:
      return state;
  }
};

var authErrorReducer = exports.authErrorReducer = function authErrorReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
  var action = arguments[1];

  switch (action.type) {
    case LOGIN:
    case LOGOUT:
      return null;
    case LOGIN_ERROR:
    case UNAUTHORIZED_ERROR:
      return action.authError;
    default:
      return state;
  }
};

var profileReducer = exports.profileReducer = function profileReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : { isLoaded: false, isEmpty: true };
  var action = arguments[1];

  switch (action.type) {
    case SET_PROFILE:
      if (!action.profile) {
        return _extends({}, state, {
          isEmpty: true,
          isLoaded: true
        });
      }
      return _extends({}, action.profile, {
        isEmpty: false,
        isLoaded: true
      });
    case PROFILE_UPDATE_SUCCESS:
      return _extends({}, state, action.payload);
    case LOGIN:
      if (action.preserve && action.preserve.profile) {
        return (0, _reducers.preserveValuesFromState)(state, action.preserve.profile, {
          isLoaded: true,
          isEmpty: true
        });
      }
      return {
        isEmpty: true,
        isLoaded: false
      };
    case LOGOUT:
    case AUTH_EMPTY_CHANGE:
      if (action.preserve && action.preserve.profile) {
        return (0, _reducers.preserveValuesFromState)(state, action.preserve.profile, {
          isLoaded: true,
          isEmpty: true
        });
      }
      return { isLoaded: true, isEmpty: true };
    default:
      return state;
  }
};

var errorsReducer = exports.errorsReducer = function errorsReducer() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var action = arguments[1];

  switch (action.type) {
    case LOGIN_ERROR:
    case UNAUTHORIZED_ERROR:
      if (!(0, _isArray3.default)(state)) {
        throw new Error('Errors state must be an array');
      }
      return [].concat(_toConsumableArray(state), [action.authError]);
    case LOGOUT:
    case CLEAR_ERRORS:
      if (action.preserve && action.preserve.errors) {
        if (typeof action.preserve.errors !== 'function') {
          throw new Error('Preserve for the errors state currently only supports functions');
        }
        return state.filter(action.preserve.errors);
      }
      return [];
    default:
      return state;
  }
};

var listenersById = function listenersById() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var _ref4 = arguments[1];
  var type = _ref4.type,
      path = _ref4.path,
      payload = _ref4.payload;

  switch (type) {
    case SET_LISTENER:
      return _extends({}, state, _defineProperty({}, payload.id, {
        id: payload.id,
        path: path
      }));
    case UNSET_LISTENER:
      return (0, _omit3.default)(state, [payload.id]);
    default:
      return state;
  }
};

var allListeners = function allListeners() {
  var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
  var _ref5 = arguments[1];
  var type = _ref5.type,
      path = _ref5.path,
      payload = _ref5.payload;

  switch (type) {
    case SET_LISTENER:
      return [].concat(_toConsumableArray(state), [payload.id]);
    case UNSET_LISTENER:
      return state.filter(function (lId) {
        return lId !== payload.id;
      });
    default:
      return state;
  }
};

var listenersReducer = exports.listenersReducer = (0, _reducers.combineReducers)({
  byId: listenersById,
  allIds: allListeners
});

var dataReducer = exports.dataReducer = createDataReducer();

var orderedReducer = exports.orderedReducer = createDataReducer('ordered');