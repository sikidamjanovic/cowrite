"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = reduxFirestore;
exports.getFirestore = void 0;

var _constants = require("./constants");

var _createFirestoreInstance = _interopRequireDefault(require("./createFirestoreInstance"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; var ownKeys = Object.keys(source); if (typeof Object.getOwnPropertySymbols === 'function') { ownKeys = ownKeys.concat(Object.getOwnPropertySymbols(source).filter(function (sym) { return Object.getOwnPropertyDescriptor(source, sym).enumerable; })); } ownKeys.forEach(function (key) { _defineProperty(target, key, source[key]); }); } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var firestoreInstance;

function reduxFirestore(firebaseInstance, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var store = next(reducer, initialState, middleware);

      var configs = _objectSpread({}, _constants.defaultConfig, otherConfig);

      firestoreInstance = (0, _createFirestoreInstance.default)(firebaseInstance.firebase_ || firebaseInstance, configs, store.dispatch);
      store.firestore = firestoreInstance;
      return store;
    };
  };
}

var getFirestore = function getFirestore() {
  if (!firestoreInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.');
  }

  return firestoreInstance;
};

exports.getFirestore = getFirestore;