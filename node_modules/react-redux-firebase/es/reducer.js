'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers = require('./utils/reducers');

var _reducers2 = require('./reducers');

exports.default = (0, _reducers.combineReducers)({
  requesting: _reducers2.requestingReducer,
  requested: _reducers2.requestedReducer,
  timestamps: _reducers2.timestampsReducer,
  data: _reducers2.dataReducer,
  ordered: _reducers2.orderedReducer,
  auth: _reducers2.authReducer,
  authError: _reducers2.authErrorReducer,
  profile: _reducers2.profileReducer,
  listeners: _reducers2.listenersReducer,
  isInitializing: _reducers2.isInitializingReducer,
  errors: _reducers2.errorsReducer
});
module.exports = exports.default;