'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getFirebase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createFirebaseInstance = require('./createFirebaseInstance');

var _auth = require('./utils/auth');

var _constants = require('./constants');

var _actions = require('./actions');

var firebaseInstance = void 0;

exports.default = function (instance, otherConfig) {
  return function (next) {
    return function (reducer, initialState, middleware) {
      var store = next(reducer, initialState, middleware);

      if (!instance.SDK_VERSION && !instance.firebase_ && !instance.database) {
        throw new Error('v2.0.0-beta and higher require passing a firebase app instance or a firebase library instance. View the migration guide for details.');
      }

      var existingConfig = instance && instance._ || {};

      var configs = _extends({}, existingConfig, _constants.defaultConfig, otherConfig);

      firebaseInstance = (0, _createFirebaseInstance.createFirebaseInstance)(instance.firebase_ || instance, configs, store.dispatch);

      _actions.authActions.init(store.dispatch, firebaseInstance);

      store.firebase = firebaseInstance;

      if (configs.attachAuthIsReady) {
        store.firebaseAuthIsReady = (0, _auth.createAuthIsReady)(store, configs);
      }

      return store;
    };
  };
};

var getFirebase = exports.getFirebase = function getFirebase() {
  if (!firebaseInstance) {
    throw new Error('Firebase instance does not yet exist. Check your compose function.');
  }

  return firebaseInstance;
};