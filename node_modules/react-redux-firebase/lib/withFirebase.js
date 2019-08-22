'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.createWithFirebase = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _propTypes = require('prop-types');

var _propTypes2 = _interopRequireDefault(_propTypes);

var _hoistNonReactStatics = require('hoist-non-react-statics');

var _hoistNonReactStatics2 = _interopRequireDefault(_hoistNonReactStatics);

var _utils = require('./utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var createWithFirebase = exports.createWithFirebase = function createWithFirebase() {
  var storeKey = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 'store';
  return function (WrappedComponent) {
    var withFirebase = function (_Component) {
      _inherits(withFirebase, _Component);

      function withFirebase() {
        var _ref;

        var _temp, _this, _ret;

        _classCallCheck(this, withFirebase);

        for (var _len = arguments.length, args = Array(_len), _key = 0; _key < _len; _key++) {
          args[_key] = arguments[_key];
        }

        return _ret = (_temp = (_this = _possibleConstructorReturn(this, (_ref = withFirebase.__proto__ || Object.getPrototypeOf(withFirebase)).call.apply(_ref, [this].concat(args))), _this), _this.store = _this.context[storeKey], _temp), _possibleConstructorReturn(_this, _ret);
      }

      _createClass(withFirebase, [{
        key: 'render',
        value: function render() {
          return _react2.default.createElement(WrappedComponent, _extends({}, this.props, this.state, {
            dispatch: this.store.dispatch,
            firebase: this.store.firebase
          }));
        }
      }]);

      return withFirebase;
    }(_react.Component);

    withFirebase.wrappedComponent = WrappedComponent;
    withFirebase.displayName = (0, _utils.wrapDisplayName)(WrappedComponent, 'withFirebase');
    withFirebase.contextTypes = _defineProperty({}, storeKey, _propTypes2.default.object.isRequired);


    return (0, _hoistNonReactStatics2.default)(withFirebase, WrappedComponent);
  };
};

exports.default = createWithFirebase();