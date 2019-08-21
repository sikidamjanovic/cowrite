'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFirebaseInstance = undefined;

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _utils = require('./utils');

var _actions = require('./utils/actions');

var _actions2 = require('./actions');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var createFirebaseInstance = exports.createFirebaseInstance = function createFirebaseInstance(firebase, configs, dispatch) {
  if (configs.enableLogging && firebase.database && typeof firebase.database.enableLogging === 'function') {
    firebase.database.enableLogging(configs.enableLogging);
  }

  var defaultInternals = {
    watchers: {},
    listeners: {},
    callbacks: {},
    queries: {},
    config: configs,
    authUid: null
  };

  Object.defineProperty(firebase, '_', {
    value: defaultInternals,
    writable: true,
    enumerable: true,
    configurable: true
  });

  var withMeta = function withMeta(method, path, value, onComplete) {
    if ((0, _isObject3.default)(value)) {
      var prefix = method === 'update' ? 'updated' : 'created';
      var dataWithMeta = _extends({}, value, _defineProperty({}, prefix + 'At', firebase.database.ServerValue.TIMESTAMP));
      if (firebase.auth().currentUser) {
        dataWithMeta[prefix + 'By'] = firebase.auth().currentUser.uid;
      }
      return firebase.database().ref(path)[method](dataWithMeta, onComplete);
    }
    return firebase.database().ref(path)[method](value, onComplete);
  };

  var set = function set(path, value, onComplete) {
    return firebase.database().ref(path).set(value, onComplete);
  };

  var setWithMeta = function setWithMeta(path, value, onComplete) {
    return withMeta('set', path, value, onComplete);
  };

  var push = function push(path, value, onComplete) {
    return firebase.database().ref(path).push(value, onComplete);
  };

  var pushWithMeta = function pushWithMeta(path, value, onComplete) {
    return withMeta('push', path, value, onComplete);
  };

  var update = function update(path, value, onComplete) {
    return firebase.database().ref(path).update(value, onComplete);
  };

  var updateWithMeta = function updateWithMeta(path, value, onComplete) {
    return withMeta('update', path, value, onComplete);
  };

  var remove = function remove(path, onComplete, options) {
    return _actions2.queryActions.remove(firebase, dispatch, path, options).then(function () {
      if (typeof onComplete === 'function') onComplete();
      return path;
    });
  };

  var uniqueSet = function uniqueSet(path, value, onComplete) {
    return firebase.database().ref(path).transaction(function (d) {
      return d === null ? value : undefined;
    }).then(function (_ref) {
      var committed = _ref.committed,
          snapshot = _ref.snapshot;

      if (!committed) {
        var newError = new Error('Path already exists.');
        if (onComplete) onComplete(newError);
        return Promise.reject(newError);
      }
      if (onComplete) onComplete(snapshot);
      return snapshot;
    });
  };

  var uploadFile = function uploadFile(path, file, dbPath, options) {
    return _actions2.storageActions.uploadFile(dispatch, firebase, {
      path: path,
      file: file,
      dbPath: dbPath,
      options: options
    });
  };

  var uploadFiles = function uploadFiles(path, files, dbPath, options) {
    return _actions2.storageActions.uploadFiles(dispatch, firebase, {
      path: path,
      files: files,
      dbPath: dbPath,
      options: options
    });
  };

  var deleteFile = function deleteFile(path, dbPath) {
    return _actions2.storageActions.deleteFile(dispatch, firebase, { path: path, dbPath: dbPath });
  };

  var watchEvent = function watchEvent(type, path, storeAs) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return _actions2.queryActions.watchEvent(firebase, dispatch, _extends({
      type: type,
      path: path,
      storeAs: storeAs
    }, options));
  };

  var unWatchEvent = function unWatchEvent(type, path, queryId) {
    var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
    return _actions2.queryActions.unWatchEvent(firebase, dispatch, _extends({
      type: type,
      path: path,
      queryId: queryId
    }, options));
  };

  var promiseEvents = function promiseEvents(watchArray, options) {
    var inputAsFunc = (0, _utils.createCallable)(watchArray);
    var prevData = inputAsFunc(options, firebase);
    var queryConfigs = (0, _utils.getEventsFromInput)(prevData);

    return Promise.all(queryConfigs.map(function (queryConfig) {
      return _actions2.queryActions.watchEvent(firebase, dispatch, queryConfig);
    }));
  };

  var login = function login(credentials) {
    return _actions2.authActions.login(dispatch, firebase, credentials);
  };

  var logout = function logout() {
    return _actions2.authActions.logout(dispatch, firebase);
  };

  var createUser = function createUser(credentials, profile) {
    return _actions2.authActions.createUser(dispatch, firebase, credentials, profile);
  };

  var resetPassword = function resetPassword(credentials) {
    return _actions2.authActions.resetPassword(dispatch, firebase, credentials);
  };

  var confirmPasswordReset = function confirmPasswordReset(code, password) {
    return _actions2.authActions.confirmPasswordReset(dispatch, firebase, code, password);
  };

  var verifyPasswordResetCode = function verifyPasswordResetCode(code) {
    return _actions2.authActions.verifyPasswordResetCode(dispatch, firebase, code);
  };

  var updateProfile = function updateProfile(profileUpdate, options) {
    return _actions2.authActions.updateProfile(dispatch, firebase, profileUpdate, options);
  };

  var updateAuth = function updateAuth(authUpdate, updateInProfile) {
    return _actions2.authActions.updateAuth(dispatch, firebase, authUpdate, updateInProfile);
  };

  var updateEmail = function updateEmail(newEmail, updateInProfile) {
    return _actions2.authActions.updateEmail(dispatch, firebase, newEmail, updateInProfile);
  };

  var reloadAuth = function reloadAuth() {
    return _actions2.authActions.reloadAuth(dispatch, firebase);
  };

  var linkWithCredential = function linkWithCredential(credential) {
    return _actions2.authActions.linkWithCredential(dispatch, firebase, credential);
  };

  var actionCreators = (0, _actions.mapWithFirebaseAndDispatch)(firebase, dispatch, {
    signInWithPhoneNumber: _actions2.authActions.signInWithPhoneNumber
  });

  var helpers = _extends({
    ref: function ref(path) {
      return firebase.database().ref(path);
    },
    set: set,
    setWithMeta: setWithMeta,
    uniqueSet: uniqueSet,
    push: push,
    pushWithMeta: pushWithMeta,
    remove: remove,
    update: update,
    updateWithMeta: updateWithMeta,
    login: login,
    logout: logout,
    updateAuth: updateAuth,
    updateEmail: updateEmail,
    updateProfile: updateProfile,
    uploadFile: uploadFile,
    uploadFiles: uploadFiles,
    deleteFile: deleteFile,
    createUser: createUser,
    resetPassword: resetPassword,
    confirmPasswordReset: confirmPasswordReset,
    verifyPasswordResetCode: verifyPasswordResetCode,
    watchEvent: watchEvent,
    unWatchEvent: unWatchEvent,
    reloadAuth: reloadAuth,
    linkWithCredential: linkWithCredential,
    promiseEvents: promiseEvents
  }, actionCreators);

  return _extends(firebase, helpers, { helpers: helpers });
};