'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.deleteFile = exports.uploadFiles = exports.uploadFile = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('../constants');

var _actions = require('../utils/actions');

var _storage = require('../utils/storage');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var FILE_UPLOAD_START = _constants.actionTypes.FILE_UPLOAD_START,
    FILE_UPLOAD_ERROR = _constants.actionTypes.FILE_UPLOAD_ERROR,
    FILE_UPLOAD_COMPLETE = _constants.actionTypes.FILE_UPLOAD_COMPLETE,
    FILE_DELETE_START = _constants.actionTypes.FILE_DELETE_START,
    FILE_DELETE_ERROR = _constants.actionTypes.FILE_DELETE_ERROR,
    FILE_DELETE_COMPLETE = _constants.actionTypes.FILE_DELETE_COMPLETE;
var uploadFile = exports.uploadFile = function uploadFile(dispatch, firebase, config) {
  if (!firebase.storage) {
    throw new Error('Firebase storage is required to upload files');
  }

  var _ref = config || {},
      path = _ref.path,
      file = _ref.file,
      dbPath = _ref.dbPath,
      _ref$options = _ref.options,
      options = _ref$options === undefined ? { progress: false } : _ref$options;

  var fileMetadata = options.metadata;
  var logErrors = firebase._.config.logErrors;

  var nameFromOptions = (0, _isFunction3.default)(options.name) ? options.name(file, firebase, config) : options.name;
  var filename = nameFromOptions || file.name;

  var meta = _extends({}, config, { filename: filename });

  dispatch({ type: FILE_UPLOAD_START, payload: _extends({}, config, { filename: filename }) });

  var uploadPromise = function uploadPromise() {
    return options.progress ? (0, _storage.uploadFileWithProgress)(dispatch, firebase, {
      path: path,
      file: file,
      filename: filename,
      meta: meta,
      fileMetadata: fileMetadata
    }) : firebase.storage().ref(path + '/' + filename).put(file, fileMetadata);
  };

  return uploadPromise().then(function (uploadTaskSnapshot) {
    if (!dbPath || !firebase.database && !firebase.firestore) {
      dispatch({
        type: FILE_UPLOAD_COMPLETE,
        meta: _extends({}, config, { filename: filename }),
        payload: {
          uploadTaskSnapshot: uploadTaskSnapshot,
          uploadTaskSnaphot: uploadTaskSnapshot }
      });
      return {
        uploadTaskSnapshot: uploadTaskSnapshot,
        uploadTaskSnaphot: uploadTaskSnapshot };
    }

    return (0, _storage.writeMetadataToDb)({
      firebase: firebase,
      uploadTaskSnapshot: uploadTaskSnapshot,
      dbPath: dbPath,
      options: options
    }).then(function (payload) {
      dispatch({
        type: FILE_UPLOAD_COMPLETE,
        meta: _extends({}, config, { filename: filename }),
        payload: payload
      });
      return payload;
    });
  }).catch(function (err) {
    if (logErrors) {
      console.error && console.error('RRF: Error uploading file: ' + (err.message || err), err);
    }
    dispatch({ type: FILE_UPLOAD_ERROR, path: path, payload: err });
    return Promise.reject(err);
  });
};

var uploadFiles = function uploadFiles(dispatch, firebase, _ref2) {
  var files = _ref2.files,
      other = _objectWithoutProperties(_ref2, ['files']);

  return Promise.all((0, _map3.default)(files, function (file) {
    return uploadFile(dispatch, firebase, _extends({ file: file }, other));
  }));
};

exports.uploadFiles = uploadFiles;
var deleteFile = exports.deleteFile = function deleteFile(dispatch, firebase, _ref3) {
  var path = _ref3.path,
      dbPath = _ref3.dbPath;
  return (0, _actions.wrapInDispatch)(dispatch, {
    method: _storage.deleteFile,
    args: [firebase, { path: path, dbPath: dbPath }],
    types: [FILE_DELETE_START, FILE_DELETE_COMPLETE, FILE_DELETE_ERROR]
  });
};