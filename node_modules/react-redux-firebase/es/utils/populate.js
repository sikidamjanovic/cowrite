'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.promisesForPopulate = exports.populateList = exports.getPopulateChild = exports.getPopulates = exports.getPopulateObjs = exports.getChildType = exports.getPopulateObj = undefined;

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _forEach2 = require('lodash/forEach');

var _forEach3 = _interopRequireDefault(_forEach2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _isObject2 = require('lodash/isObject');

var _isObject3 = _interopRequireDefault(_isObject2);

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var getPopulateObj = exports.getPopulateObj = function getPopulateObj(str) {
  if (!(0, _isString3.default)(str)) {
    return str;
  }
  var strArray = str.split(':');

  return { child: strArray[0], root: strArray[1] };
};
var getChildType = exports.getChildType = function getChildType(child) {
  if ((0, _isString3.default)(child)) {
    return 'string';
  }
  if ((0, _isArray3.default)(child)) {
    return 'array';
  }
  if ((0, _isObject3.default)(child)) {
    return 'object';
  }
  return 'other';
};

var getPopulateObjs = exports.getPopulateObjs = function getPopulateObjs(arr) {
  if (!(0, _isArray3.default)(arr)) {
    return arr;
  }
  return arr.map(function (o) {
    return (0, _isObject3.default)(o) ? o : getPopulateObj(o);
  });
};

var getPopulates = exports.getPopulates = function getPopulates(params) {
  var populates = (0, _filter3.default)(params, function (param) {
    return param.indexOf('populate') !== -1 || (0, _isObject3.default)(param) && param.populates;
  }).map(function (p) {
    return p.split('=')[1];
  });

  if (!populates.length) {
    return null;
  }
  return populates.map(getPopulateObj);
};

var getPopulateChild = exports.getPopulateChild = function getPopulateChild(firebase, populate, id) {
  return firebase.database().ref().child(populate.root + '/' + id).once('value').then(function (snap) {
    return snap.val();
  });
};

var populateList = exports.populateList = function populateList(firebase, list, p, results) {
  if (!results[p.root]) {
    (0, _set3.default)(results, p.root, {});
  }
  return Promise.all((0, _map3.default)(list, function (id, childKey) {
    var populateKey = id === true || p.populateByKey ? childKey : id;
    return getPopulateChild(firebase, p, populateKey).then(function (pc) {
      if (pc) {
        return (0, _set3.default)(results, p.root + '.' + populateKey, pc);
      }
      return results;
    });
  }));
};

var promisesForPopulate = exports.promisesForPopulate = function promisesForPopulate(firebase, dataKey, originalData, populatesIn) {
  var promisesArray = [];
  var results = {};

  var populatesForData = getPopulateObjs((0, _isFunction3.default)(populatesIn) ? populatesIn(dataKey, originalData) : populatesIn);

  var dataHasPopulateChilds = (0, _some3.default)(populatesForData, function (populate) {
    return (0, _has3.default)(originalData, populate.child);
  });

  if (dataHasPopulateChilds) {
    (0, _forEach3.default)(populatesForData, function (p) {
      if ((0, _isString3.default)((0, _get3.default)(originalData, p.child))) {
        return promisesArray.push(getPopulateChild(firebase, p, (0, _get3.default)(originalData, p.child)).then(function (v) {
          if (v) {
            (0, _set3.default)(results, p.root + '.' + (0, _get3.default)(originalData, p.child), v);
          }
        }));
      }

      return promisesArray.push(populateList(firebase, (0, _get3.default)(originalData, p.child), p, results));
    });
  } else {
    (0, _forEach3.default)(originalData, function (d, key) {
      var populatesForDataItem = getPopulateObj((0, _isFunction3.default)(populatesIn) ? populatesIn(key, d) : populatesIn);

      (0, _forEach3.default)(populatesForDataItem, function (p) {
        var idOrList = (0, _get3.default)(d, p.child);

        if (!idOrList) {
          return;
        }

        if ((0, _isString3.default)(idOrList)) {
          return promisesArray.push(getPopulateChild(firebase, p, idOrList).then(function (v) {
            if (v) {
              (0, _set3.default)(results, p.root + '.' + idOrList, v);
            }
            return results;
          }));
        }

        if ((0, _isArray3.default)(idOrList) || (0, _isObject3.default)(idOrList)) {
          return promisesArray.push(populateList(firebase, idOrList, p, results));
        }
      });
    });
  }

  return Promise.all(promisesArray).then(function () {
    return results;
  });
};

exports.default = { promisesForPopulate: promisesForPopulate };