'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _reducers = require('./utils/reducers');

var _reducers2 = require('./reducers');

exports.default = (0, _reducers.combineReducers)({
  status: _reducers2.statusReducer,
  data: _reducers2.dataReducer,
  ordered: _reducers2.orderedReducer,
  listeners: _reducers2.listenersReducer,
  errors: _reducers2.errorsReducer
});