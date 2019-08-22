'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createFirebaseInstance = require('./createFirebaseInstance');

var _firebaseConnect = require('./firebaseConnect');

var _firebaseConnect2 = _interopRequireDefault(_firebaseConnect);

var _firestoreConnect = require('./firestoreConnect');

var _firestoreConnect2 = _interopRequireDefault(_firestoreConnect);

var _withFirebase = require('./withFirebase');

var _withFirebase2 = _interopRequireDefault(_withFirebase);

var _withFirestore = require('./withFirestore');

var _withFirestore2 = _interopRequireDefault(_withFirestore);

var _enhancer = require('./enhancer');

var _enhancer2 = _interopRequireDefault(_enhancer);

var _reducer = require('./reducer');

var _reducer2 = _interopRequireDefault(_reducer);

var _constants = require('./constants');

var _constants2 = _interopRequireDefault(_constants);

var _auth = require('./utils/auth');

var _helpers = require('./helpers');

var helpers = _interopRequireWildcard(_helpers);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = _extends({
  firebase: _firebaseConnect2.default,
  createFirebaseInstance: _createFirebaseInstance.createFirebaseInstance,
  firebaseConnect: _firebaseConnect2.default,
  createFirebaseConnect: _firebaseConnect.createFirebaseConnect,
  firestoreConnect: _firestoreConnect2.default,
  createFirestoreConnect: _firestoreConnect.createFirestoreConnect,
  withFirebase: _withFirebase2.default,
  createWithFirebase: _withFirebase.createWithFirebase,
  withFirestore: _withFirestore2.default,
  createWithFirestore: _withFirestore.createWithFirestore,
  reducer: _reducer2.default,
  firebaseReducer: _reducer2.default,
  firebaseStateReducer: _reducer2.default,
  reduxReactFirebase: _enhancer2.default,
  reactReduxFirebase: _enhancer2.default,
  reduxFirebase: _enhancer2.default,
  constants: _constants2.default,
  actionTypes: _constants.actionTypes,
  getFirebase: _enhancer.getFirebase,
  authIsReady: _auth.authIsReady,
  helpers: helpers
}, helpers);
module.exports = exports['default'];