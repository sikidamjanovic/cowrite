'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _isUndefined2 = require('lodash/isUndefined');

var _isUndefined3 = _interopRequireDefault(_isUndefined2);

var _omitBy2 = require('lodash/omitBy');

var _omitBy3 = _interopRequireDefault(_omitBy2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

exports.deleteFile = deleteFile;
exports.writeMetadataToDb = writeMetadataToDb;
exports.uploadFileWithProgress = uploadFileWithProgress;

var _constants = require('../constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var FILE_UPLOAD_ERROR = _constants.actionTypes.FILE_UPLOAD_ERROR,
    FILE_UPLOAD_PROGRESS = _constants.actionTypes.FILE_UPLOAD_PROGRESS;
function deleteFile(firebase, _ref) {
  var path = _ref.path,
      dbPath = _ref.dbPath;

  return firebase.storage().ref(path).delete().then(function () {
    if (!dbPath || !firebase.database && !firebase.firestore) {
      return { path: path };
    }

    var metaDeletePromise = function metaDeletePromise() {
      return firebase._.config.useFirestoreForStorageMeta ? firebase.firestore().doc(dbPath).delete() : firebase.database().ref(dbPath).remove();
    };

    return metaDeletePromise().then(function () {
      return { path: path, dbPath: dbPath };
    });
  });
}

function createUploadMetaResponseHandler(_ref2) {
  var fileData = _ref2.fileData,
      firebase = _ref2.firebase,
      uploadTaskSnapshot = _ref2.uploadTaskSnapshot,
      downloadURL = _ref2.downloadURL;

  return function uploadResultFromSnap(metaDataSnapshot) {
    var useFirestoreForStorageMeta = firebase._.config.useFirestoreForStorageMeta;

    var result = {
      snapshot: metaDataSnapshot,
      key: metaDataSnapshot.key || metaDataSnapshot.id,
      File: fileData,
      metaDataSnapshot: metaDataSnapshot,
      uploadTaskSnapshot: uploadTaskSnapshot,

      uploadTaskSnaphot: uploadTaskSnapshot,
      createdAt: useFirestoreForStorageMeta ? firebase.firestore.FieldValue.serverTimestamp() : firebase.database.ServerValue.TIMESTAMP
    };

    if (metaDataSnapshot.id) {
      result.id = metaDataSnapshot.id;
    }

    if (downloadURL) {
      result.downloadURL = downloadURL;
    }
    return result;
  };
}

function getDownloadURLFromUploadTaskSnapshot(uploadTaskSnapshot) {
  if (uploadTaskSnapshot.ref && typeof uploadTaskSnapshot.ref.getDownloadURL === 'function') {
    return uploadTaskSnapshot.ref.getDownloadURL();
  }

  return Promise.resolve(uploadTaskSnapshot.downloadURLs && uploadTaskSnapshot.downloadURLs[0]);
}

function writeMetadataToDb(_ref3) {
  var firebase = _ref3.firebase,
      uploadTaskSnapshot = _ref3.uploadTaskSnapshot,
      dbPath = _ref3.dbPath,
      options = _ref3.options;
  var _firebase$_$config = firebase._.config,
      fileMetadataFactory = _firebase$_$config.fileMetadataFactory,
      useFirestoreForStorageMeta = _firebase$_$config.useFirestoreForStorageMeta;
  var metadataFactory = options.metadataFactory;

  var metaFactoryFunction = metadataFactory || fileMetadataFactory;

  return getDownloadURLFromUploadTaskSnapshot(uploadTaskSnapshot).then(function (downloadURL) {
    var fileData = (0, _isFunction3.default)(metaFactoryFunction) ? metaFactoryFunction(uploadTaskSnapshot, firebase, uploadTaskSnapshot.metadata, downloadURL) : (0, _omitBy3.default)(uploadTaskSnapshot.metadata, _isUndefined3.default);

    var resultFromSnap = createUploadMetaResponseHandler({
      fileData: fileData,
      firebase: firebase,
      uploadTaskSnapshot: uploadTaskSnapshot,
      downloadURL: downloadURL
    });

    var metaSetPromise = function metaSetPromise(fileData) {
      if (useFirestoreForStorageMeta) {
        return firebase.firestore().collection(dbPath).add(fileData);
      }

      var newMetaRef = firebase.database().ref(dbPath).push();

      return newMetaRef.set(fileData).then(function (res) {
        return newMetaRef;
      });
    };

    return metaSetPromise(fileData).then(resultFromSnap);
  });
}

function uploadFileWithProgress(dispatch, firebase, _ref4) {
  var path = _ref4.path,
      file = _ref4.file,
      filename = _ref4.filename,
      meta = _ref4.meta,
      fileMetadata = _ref4.fileMetadata;

  var uploadEvent = firebase.storage().ref(path + '/' + filename).put(file, fileMetadata);

  var unListen = uploadEvent.on(firebase.storage.TaskEvent.STATE_CHANGED, {
    next: function next(snapshot) {
      dispatch({
        type: FILE_UPLOAD_PROGRESS,
        meta: meta,
        payload: {
          snapshot: snapshot,
          percent: Math.floor(snapshot.bytesTransferred / snapshot.totalBytes * 100)
        }
      });
    },
    error: function error(err) {
      dispatch({ type: FILE_UPLOAD_ERROR, meta: meta, payload: err });
      unListen();
    },
    complete: function complete() {
      unListen();
    }
  });
  return uploadEvent;
}