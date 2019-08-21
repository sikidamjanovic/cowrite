'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populateAndDispatch = exports.orderedFromSnapshot = exports.applyParamsToQuery = exports.unsetWatcher = exports.getWatcherCount = exports.setWatcher = exports.getQueryIdFromPath = exports.getWatchPath = undefined;

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _isNaN2 = require('lodash/isNaN');

var _isNaN3 = _interopRequireDefault(_isNaN2);

var _constants = require('../constants');

var _populate = require('./populate');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var tryParseToNumber = function tryParseToNumber(value) {
  var result = Number(value);
  if ((0, _isNaN3.default)(result)) {
    return value;
  }
  return result;
};

var getWatchPath = exports.getWatchPath = function getWatchPath(event, path) {
  if (!event || event === '' || !path) {
    throw new Error('Event and path are required');
  }
  return event + ':' + (path.substring(0, 1) === '/' ? '' : '/') + path;
};

var getQueryIdFromPath = exports.getQueryIdFromPath = function getQueryIdFromPath(path, event) {
  if (!(0, _isString3.default)(path)) {
    throw new Error('Query path must be a string');
  }
  var origPath = path;
  var pathSplitted = path.split('#');
  path = pathSplitted[0];

  var isQuery = pathSplitted.length > 1;
  var queryParams = isQuery ? pathSplitted[1].split('&') : [];
  var queryId = isQuery ? queryParams.map(function (param) {
    var splittedParam = param.split('=');

    if (splittedParam[0] === 'queryId') {
      return splittedParam[1];
    }
  }).filter(function (q) {
    return q;
  }) : undefined;
  return queryId && queryId.length > 0 ? event ? event + ':/' + queryId : queryId[0] : isQuery ? origPath : undefined;
};

var setWatcher = exports.setWatcher = function setWatcher(firebase, dispatch, event, path, queryId) {
  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);

  if (firebase._.watchers[id]) {
    firebase._.watchers[id]++;
  } else {
    firebase._.watchers[id] = 1;
  }

  dispatch({ type: _constants.actionTypes.SET_LISTENER, path: path, payload: { id: id } });

  return firebase._.watchers[id];
};

var getWatcherCount = exports.getWatcherCount = function getWatcherCount(firebase, event, path, queryId) {
  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);
  return firebase._.watchers[id];
};

var unsetWatcher = exports.unsetWatcher = function unsetWatcher(firebase, dispatch, event, path, queryId) {
  var id = queryId || getQueryIdFromPath(path, event) || getWatchPath(event, path);
  path = path.split('#')[0];
  var watchers = firebase._.watchers;

  if (watchers[id] <= 1) {
    delete watchers[id];
    if (event !== 'first_child' && event !== 'once') {
      firebase.database().ref().child(path).off(event);
    }
  } else if (watchers[id]) {
    watchers[id]--;
  }

  dispatch({ type: _constants.actionTypes.UNSET_LISTENER, path: path, payload: { id: id } });
};

var applyParamsToQuery = exports.applyParamsToQuery = function applyParamsToQuery(queryParams, query) {
  var doNotParse = false;
  if (queryParams) {
    queryParams.forEach(function (param) {
      param = param.split('=');
      switch (param[0]) {
        case 'orderByValue':
          query = query.orderByValue();
          doNotParse = true;
          break;
        case 'orderByPriority':
          query = query.orderByPriority();
          doNotParse = true;
          break;
        case 'orderByKey':
          query = query.orderByKey();
          doNotParse = true;
          break;
        case 'orderByChild':
          query = query.orderByChild(param[1]);
          break;
        case 'limitToFirst':
          query = query.limitToFirst(parseInt(param[1], 10));
          break;
        case 'limitToLast':
          query = query.limitToLast(parseInt(param[1], 10));
          break;
        case 'notParsed':
          doNotParse = true;
          break;
        case 'parsed':
          doNotParse = false;
          break;
        case 'equalTo':
          var equalToParam = !doNotParse ? tryParseToNumber(param[1]) : param[1];
          equalToParam = equalToParam === 'null' ? null : equalToParam;
          equalToParam = equalToParam === 'false' ? false : equalToParam;
          equalToParam = equalToParam === 'true' ? true : equalToParam;
          query = param.length === 3 ? query.equalTo(equalToParam, param[2]) : query.equalTo(equalToParam);
          break;
        case 'startAt':
          var startAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1];
          startAtParam = startAtParam === 'null' ? null : startAtParam;
          query = param.length === 3 ? query.startAt(startAtParam, param[2]) : query.startAt(startAtParam);
          break;
        case 'endAt':
          var endAtParam = !doNotParse ? tryParseToNumber(param[1]) : param[1];
          endAtParam = endAtParam === 'null' ? null : endAtParam;
          query = param.length === 3 ? query.endAt(endAtParam, param[2]) : query.endAt(endAtParam);
          break;
      }
    });
  }

  return query;
};

var orderedFromSnapshot = exports.orderedFromSnapshot = function orderedFromSnapshot(snap) {
  if (snap.hasChildren && !snap.hasChildren()) {
    return null;
  }
  var ordered = [];
  if (snap.forEach) {
    snap.forEach(function (child) {
      ordered.push({ key: child.key, value: child.val() });
    });
  }
  return (0, _size3.default)(ordered) ? ordered : null;
};

var populateAndDispatch = exports.populateAndDispatch = function populateAndDispatch(firebase, dispatch, config) {
  var data = config.data,
      populates = config.populates,
      snapshot = config.snapshot,
      path = config.path,
      storeAs = config.storeAs;

  return (0, _populate.promisesForPopulate)(firebase, snapshot.key, data, populates).then(function (results) {
    (0, _forEach3.default)(results, function (result, path) {
      dispatch({
        type: _constants.actionTypes.MERGE,
        path: path,
        data: result
      });
    });
    dispatch({
      type: _constants.actionTypes.SET,
      path: storeAs || path,
      data: data,
      ordered: orderedFromSnapshot(snapshot)
    });
    return results;
  }).catch(function (err) {
    dispatch({
      type: _constants.actionTypes.ERROR,
      payload: err
    });
    return Promise.reject(err);
  });
};