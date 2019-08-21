'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.remove = exports.unWatchEvents = exports.watchEvents = exports.unWatchEvent = exports.watchEvent = undefined;

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _constants = require('../constants');

var _query = require('../utils/query');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var watchEvent = exports.watchEvent = function watchEvent(firebase, dispatch, options) {
  if (!firebase.database || typeof firebase.database !== 'function') {
    throw new Error('Firebase database is required to create watchers');
  }
  var type = options.type,
      path = options.path,
      populates = options.populates,
      queryParams = options.queryParams,
      queryId = options.queryId,
      isQuery = options.isQuery,
      storeAs = options.storeAs;
  var logErrors = firebase._.config.logErrors;


  var watchPath = !storeAs ? path : path + '@' + storeAs;
  var id = queryId || (0, _query.getQueryIdFromPath)(path);
  var counter = (0, _query.getWatcherCount)(firebase, type, watchPath, id);

  if (counter > 0) {
    if (id) {
      (0, _query.unsetWatcher)(firebase, dispatch, type, path, id);
    }
  }

  (0, _query.setWatcher)(firebase, dispatch, type, watchPath, id);

  if (type === 'first_child') {
    return firebase.database().ref().child(path).orderByKey().limitToFirst(1).once('value').then(function (snapshot) {
      if (snapshot.val() === null) {
        dispatch({
          type: _constants.actionTypes.NO_VALUE,
          path: storeAs || path
        });
      }
      return snapshot;
    }).catch(function (err) {
      dispatch({
        type: _constants.actionTypes.ERROR,
        path: storeAs || path,
        payload: err
      });
      return Promise.reject(err);
    });
  }

  var query = firebase.database().ref().child(path);

  if (isQuery) {
    query = (0, _query.applyParamsToQuery)(queryParams, query);
  }

  dispatch({ type: _constants.actionTypes.START, path: storeAs || path });

  if (type === 'once') {
    return query.once('value').then(function (snapshot) {
      if (snapshot.val() === null) {
        return dispatch({
          type: _constants.actionTypes.NO_VALUE,
          path: storeAs || path
        });
      }

      if (!populates) {
        return dispatch({
          type: _constants.actionTypes.SET,
          path: storeAs || path,
          data: snapshot.val(),
          ordered: (0, _query.orderedFromSnapshot)(snapshot)
        });
      }

      return (0, _query.populateAndDispatch)(firebase, dispatch, {
        path: path,
        storeAs: storeAs,
        snapshot: snapshot,
        data: snapshot.val(),
        populates: populates
      });
    }).catch(function (err) {
      dispatch({
        type: _constants.actionTypes.UNAUTHORIZED_ERROR,
        payload: err
      });
      return Promise.reject(err);
    });
  }

  query.on(type, function (snapshot) {
    var data = type === 'child_removed' ? undefined : snapshot.val();
    var resultPath = storeAs || type === 'value' ? path : path + '/' + snapshot.key;

    if (!populates) {
      var ordered = type === 'child_added' ? [{ key: snapshot.key, value: snapshot.val() }] : (0, _query.orderedFromSnapshot)(snapshot);
      return dispatch({
        type: _constants.actionTypes.SET,
        path: storeAs || resultPath,
        data: data,
        ordered: ordered
      });
    }

    return (0, _query.populateAndDispatch)(firebase, dispatch, {
      path: path,
      storeAs: storeAs,
      snapshot: snapshot,
      data: snapshot.val(),
      populates: populates
    });
  }, function (err) {
    if (logErrors) {
      console.log('RRF: Error retrieving data for path: ' + path + ', storeAs: ' + storeAs + '. Firebase:', err);
    }
    dispatch({
      type: _constants.actionTypes.ERROR,
      storeAs: storeAs,
      path: path,
      payload: err
    });
  });
};

var unWatchEvent = exports.unWatchEvent = function unWatchEvent(firebase, dispatch, _ref) {
  var type = _ref.type,
      path = _ref.path,
      storeAs = _ref.storeAs,
      queryId = _ref.queryId;

  var watchPath = !storeAs ? path : path + '@' + storeAs;
  (0, _query.unsetWatcher)(firebase, dispatch, type, watchPath, queryId);
};

var watchEvents = exports.watchEvents = function watchEvents(firebase, dispatch, events) {
  if (!(0, _isArray3.default)(events)) {
    throw new Error('Events config must be an Array');
  }
  return events.map(function (event) {
    return watchEvent(firebase, dispatch, event);
  });
};

var unWatchEvents = exports.unWatchEvents = function unWatchEvents(firebase, dispatch, events) {
  return events.forEach(function (event) {
    return unWatchEvent(firebase, dispatch, event);
  });
};

var remove = exports.remove = function remove(firebase, dispatch, path) {
  var options = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};
  var _options$dispatchActi = options.dispatchAction,
      dispatchAction = _options$dispatchActi === undefined ? true : _options$dispatchActi;
  var dispatchRemoveAction = firebase._.config.dispatchRemoveAction;

  return firebase.database().ref(path).remove().then(function () {
    if (dispatchRemoveAction && dispatchAction) {
      dispatch({ type: _constants.actionTypes.REMOVE, path: path });
    }
    return path;
  }).catch(function (err) {
    dispatch({ type: _constants.actionTypes.ERROR, payload: err });
    return Promise.reject(err);
  });
};

exports.default = { watchEvents: watchEvents, unWatchEvents: unWatchEvents, remove: remove };