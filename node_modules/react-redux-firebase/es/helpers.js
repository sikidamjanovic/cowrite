'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.populate = exports.fixPath = exports.isEmpty = exports.isLoaded = exports.getVal = undefined;

var _isFunction2 = require('lodash/isFunction');

var _isFunction3 = _interopRequireDefault(_isFunction2);

var _isArray2 = require('lodash/isArray');

var _isArray3 = _interopRequireDefault(_isArray2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _compact2 = require('lodash/compact');

var _compact3 = _interopRequireDefault(_compact2);

var _isString2 = require('lodash/isString');

var _isString3 = _interopRequireDefault(_isString2);

var _defaultsDeep2 = require('lodash/defaultsDeep');

var _defaultsDeep3 = _interopRequireDefault(_defaultsDeep2);

var _reduce2 = require('lodash/reduce');

var _reduce3 = _interopRequireDefault(_reduce2);

var _every2 = require('lodash/every');

var _every3 = _interopRequireDefault(_every2);

var _mapValues2 = require('lodash/mapValues');

var _mapValues3 = _interopRequireDefault(_mapValues2);

var _map2 = require('lodash/map');

var _map3 = _interopRequireDefault(_map2);

var _last2 = require('lodash/last');

var _last3 = _interopRequireDefault(_last2);

var _has2 = require('lodash/has');

var _has3 = _interopRequireDefault(_has2);

var _get2 = require('lodash/get');

var _get3 = _interopRequireDefault(_get2);

var _set2 = require('lodash/set');

var _set3 = _interopRequireDefault(_set2);

var _size2 = require('lodash/size');

var _size3 = _interopRequireDefault(_size2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _constants = require('./constants');

var _populate = require('./utils/populate');

var _reducers = require('./utils/reducers');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var getVal = exports.getVal = function getVal(firebase, path, notSetValue) {
  if (!firebase) {
    return notSetValue;
  }

  var dotPath = (0, _reducers.getDotStrPath)(path);
  var valueAtPath = (0, _get3.default)(firebase, dotPath, notSetValue);

  return valueAtPath;
};

var isLoaded = exports.isLoaded = function isLoaded() {
  for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
    args[_key] = arguments[_key];
  }

  return !args || !args.length ? true : (0, _every3.default)(args, function (arg) {
    return arg !== undefined && (0, _get3.default)(arg, 'isLoaded') !== false;
  });
};

var isEmpty = exports.isEmpty = function isEmpty() {
  for (var _len2 = arguments.length, args = Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
    args[_key2] = arguments[_key2];
  }

  return (0, _some3.default)(args, function (arg) {
    return !(arg && (0, _size3.default)(arg)) || arg.isEmpty === true;
  });
};

var fixPath = exports.fixPath = function fixPath(path) {
  return (path.substring(0, 1) === '/' ? '' : '/') + path;
};

var buildChildList = function buildChildList(state, list, p) {
  return (0, _mapValues3.default)(list, function (val, key) {
    var getKey = val;

    if (val === true || p.populateByKey) {
      getKey = key;
    }

    var dotRoot = (0, _compact3.default)(p.root.split('/')).join('.');
    var pathArr = [dotRoot, getKey];

    if (p.childParam) {
      pathArr.push(p.childParam);
    }

    var pathString = pathArr.join('.');

    if ((0, _get3.default)(state.data, pathString)) {
      return p.keyProp ? _extends(_defineProperty({}, p.keyProp, getKey), (0, _get3.default)(state.data, pathString)) : (0, _get3.default)(state.data, pathString);
    }

    return val === true || p.populateByKey ? val : getKey;
  });
};

var populateChild = function populateChild(state, child, p) {
  var childVal = (0, _get3.default)(child, p.child);
  if (!child || !childVal) {
    return null;
  }

  if ((0, _isString3.default)(childVal)) {
    var dotRoot = (0, _compact3.default)(p.root.split('/')).join('.');
    var pathArr = [dotRoot, childVal];

    if (p.childParam) {
      pathArr.push(p.childParam);
    }

    var pathString = pathArr.join('.');

    var populateVal = (0, _get3.default)(state.data, pathString);
    if (populateVal) {
      return (0, _set3.default)({}, p.childAlias || p.child, p.keyProp ? _extends(_defineProperty({}, p.keyProp, childVal), populateVal) : populateVal);
    }

    return child;
  }

  return (0, _set3.default)({}, p.childAlias || p.child, buildChildList(state, childVal, p));
};

var populate = exports.populate = function populate(state, path, populates, notSetValue) {
  var splitPath = (0, _compact3.default)(path.split('/'));

  var pathArr = _constants.topLevelPaths.indexOf(splitPath[0]) === -1 ? ['data'].concat(_toConsumableArray(splitPath)) : splitPath;
  var dotPath = pathArr.join('.');

  var data = (0, _get3.default)(state, dotPath, notSetValue);

  if (!state || data === notSetValue) {
    return notSetValue;
  }

  if (data === null) {
    return null;
  }

  var populatesForData = (0, _populate.getPopulateObjs)((0, _isFunction3.default)(populates) ? populates((0, _last3.default)(pathArr), data) : populates);

  if ((0, _isArray3.default)(data)) {
    var someArrayItemHasKey = function someArrayItemHasKey(array) {
      return function (key) {
        return (0, _some3.default)(array, function (item) {
          return (0, _has3.default)(item, key);
        });
      };
    };

    var _dataHasPopulateChilds = (0, _some3.default)(populatesForData, function (populate) {
      return someArrayItemHasKey(data)(['value', populate.child]);
    });

    if (_dataHasPopulateChilds) {
      return data.map(function (_ref) {
        var key = _ref.key,
            dataValue = _ref.value;

        var populatedValue = populatesForData.map(function (p) {
          return populateChild(state, dataValue, p);
        }).reduce(function (acc, v) {
          return (0, _defaultsDeep3.default)(v, acc);
        }, dataValue);

        return {
          key: key,
          value: populatedValue
        };
      });
    }

    return data;
  }

  var dataHasPopulateChilds = (0, _some3.default)(populatesForData, function (p) {
    return (0, _has3.default)(data, p.child);
  });

  if (dataHasPopulateChilds) {
    return populatesForData.map(function (p) {
      return populateChild(state, data, p);
    }).reduce(function (acc, v) {
      return (0, _defaultsDeep3.default)(v, acc);
    }, data);
  }

  if (pathArr.indexOf('profile') !== -1) {
    return data;
  }

  return (0, _mapValues3.default)(data, function (child, childKey) {
    var key = pathArr[0] === 'ordered' ? child.key : childKey;

    var populatesForDataItem = (0, _populate.getPopulateObjs)((0, _isFunction3.default)(populates) ? populates(key, child) : populates);

    var dataHasPopulateChilds = (0, _some3.default)(populatesForDataItem, function (p) {
      return (0, _has3.default)(child, p.child);
    });

    if (!dataHasPopulateChilds) {
      return child;
    }

    return (0, _reduce3.default)((0, _map3.default)(populatesForDataItem, function (p) {
      return populateChild(state, child, p);
    }), function (obj, v) {
      return (0, _defaultsDeep3.default)(v, obj);
    }, child);
  });
};