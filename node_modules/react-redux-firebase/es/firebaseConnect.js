'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createFirebaseConnect = undefined;

var _differenceWith2 = require('lodash/differenceWith');

var _differenceWith3 = _interopRequireDefault(_differenceWith2);

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

var _query = require('./actions/query');

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createFirebaseConnect = exports.createFirebaseConnect = function createFirebaseConnect() {
  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  return function () {
    var dataOrFn = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : [];
    return function (WrappedComponent) {
      var FirebaseConnect = function (_Component) {
        _inherits(FirebaseConnect, _Component);

        function FirebaseConnect() {
          var _ref;

          var _temp, _this, _ret;

          _classCallCheck(this, FirebaseConnect);

          for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
            args[_key] = arguments[_key];
          }

          return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = FirebaseConnect.__proto__ || Object.getPrototypeOf(FirebaseConnect)).call.apply(_ref, [this].concat(args))), _this), _this.firebaseEvents = [], _this.firebase = null, _this.prevData = null, _this.store = _this.context[storeKey], _temp), _possibleConstructorReturn(_this, _ret);
        }

        _createClass(FirebaseConnect, [{
          key: 'componentWillMount',
          value: function componentWillMount() {
            var _store = this.store,
                firebase = _store.firebase,
                dispatch = _store.dispatch;

            var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
            this.prevData = inputAsFunc(this.props, this.store);

            var ref = firebase.ref,
                helpers = firebase.helpers,
                storage = firebase.storage,
                database = firebase.database,
                auth = firebase.auth;

            this.firebase = _extends({ ref: ref, storage: storage, database: database, auth: auth }, helpers);

            this._firebaseEvents = (0, _utils.getEventsFromInput)(this.prevData);

            (0, _query.watchEvents)(firebase, dispatch, this._firebaseEvents);
          }
        }, {
          key: 'componentWillUnmount',
          value: function componentWillUnmount() {
            var _store2 = this.store,
                firebase = _store2.firebase,
                dispatch = _store2.dispatch;

            (0, _query.unWatchEvents)(firebase, dispatch, this._firebaseEvents);
          }
        }, {
          key: 'componentWillReceiveProps',
          value: function componentWillReceiveProps(np) {
            var _store3 = this.store,
                firebase = _store3.firebase,
                dispatch = _store3.dispatch;

            var inputAsFunc = (0, _utils.createCallable)(dataOrFn);
            var data = inputAsFunc(np, this.store);

            if (!(0, _isEqual3.default)(data, this.prevData)) {
              var itemsToSubscribe = (0, _differenceWith3.default)(data, this.prevData, _isEqual3.default);
              var itemsToUnsubscribe = (0, _differenceWith3.default)(this.prevData, data, _isEqual3.default);

              this.prevData = data;

              (0, _query.unWatchEvents)(firebase, dispatch, (0, _utils.getEventsFromInput)(itemsToUnsubscribe));

              this._firebaseEvents = (0, _utils.getEventsFromInput)(data);

              (0, _query.watchEvents)(firebase, dispatch, (0, _utils.getEventsFromInput)(itemsToSubscribe));
            }
          }
        }, {
          key: 'render',
          value: function render() {
            return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
              firebase: this.firebase
            }));
          }
        }]);

        return FirebaseConnect;
      }(_react.Component);

      FirebaseConnect.displayName = 'FirebaseConnect(' + (0, _utils.getDisplayName)(WrappedComponent) + ')';
      FirebaseConnect.wrappedComponent = WrappedComponent;
      FirebaseConnect.contextTypes = _defineProperty({}, storeKey, _propTypes2.default.object.isRequired);


      return (0, _hoistNonReactStatics2.default)(FirebaseConnect, WrappedComponent);
    };
  };
};

exports.default = createFirebaseConnect();