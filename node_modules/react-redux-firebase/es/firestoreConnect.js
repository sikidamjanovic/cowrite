'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFirestoreConnect = undefined;

var _filter2 = require('lodash/filter');

var _filter3 = _interopRequireDefault(_filter2);

var _some2 = require('lodash/some');

var _some3 = _interopRequireDefault(_some2);

var _isEqual2 = require('lodash/isEqual');

var _isEqual3 = _interopRequireDefault(_isEqual2);

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _utils = require('./utils');

var _constants = require('./constants');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createFirestoreConnect = exports.createFirestoreConnect = function createFirestoreConnect() {
  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  return function () {
    var dataOrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (WrappedComponent) {
      var FirestoreConnect = function (_Component) {
        _inherits(FirestoreConnect, _Component);

        function FirestoreConnect() {
          var _ref;

          var _temp, _this, _ret;

          _classCallCheck(this, FirestoreConnect);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FirestoreConnect.__proto__ || Object.getPrototypeOf(FirestoreConnect)).call.apply(_ref, [this].concat(args))), _this), _this.prevData = null, _this.store = _this.context[storeKey], _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(FirestoreConnect, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            if (!this.context || !this.context[storeKey]) {
              throw new Error(_constants.v3ErrorMessage);
            }
            var firestore = this.store.firestore;

            if (this.firestoreIsEnabled) {
              var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
              this.prevData = inputAsFunc(this.props, this.store);

              firestore.setListeners(this.prevData);
            }
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            var firestore = this.store.firestore;

            if (this.firestoreIsEnabled && this.prevData) {
              firestore.unsetListeners(this.prevData);
            }
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(np) {
            var firestore = this.store.firestore;

            var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
            var data = inputAsFunc(np, this.store);

            if (this.firestoreIsEnabled && !(0, _isEqual3.default)(data, this.prevData)) {
              var changes = this.getChanges(data, this.prevData);

              this.prevData = data;

              firestore.unsetListeners(changes.removed);

              firestore.setListeners(changes.added);
            }
          }
        }, {
          key: 'getChanges',
          value: function getChanges() {
            var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
            var prevData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];

            var result = {};
            result.added = (0, _filter3.default)(data, function (d) {
              return !(0, _some3.default)(prevData, function (p) {
                return (0, _isEqual3.default)(d, p);
              });
            });
            result.removed = (0, _filter3.default)(prevData, function (p) {
              return !(0, _some3.default)(data, function (d) {
                return (0, _isEqual3.default)(p, d);
              });
            });
            return result;
          }
        }, {
          key: 'render',
          value: function render() {
            var _store = this.store,
                firebase = _store.firebase,
                firestore = _store.firestore;

            var newProps = _extends({}, this.props, { firestore: firestore });
            if (firebase) {
              newProps.firebase = _extends({}, firebase, firebase.helpers);
            }
            return _react2.default.createElement(WrappedComponent, newProps);
          }
        }, {
          key: 'firestoreIsEnabled',
          get: function get() {
            return !!this.store.firestore;
          }
        }]);

        return FirestoreConnect;
      }(_react.Component);

      FirestoreConnect.wrappedComponent = WrappedComponent;
      FirestoreConnect.displayName = (0, _utils.wrapDisplayName)(WrappedComponent, 'FirestoreConnect');
      FirestoreConnect.contextTypes = _defineProperty({}, storeKey, _propTypes2.default.object.isRequired);


      return (0, _hoistNonReactStatics2.default)(FirestoreConnect, WrappedComponent);
    };
  };
};

exports.default = createFirestoreConnect();