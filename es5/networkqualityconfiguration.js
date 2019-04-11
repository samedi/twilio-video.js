'use strict';

var _slicedToArray = function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"]) _i["return"](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } }; }();

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var EventEmitter = require('events').EventEmitter;

var _require = require('./util/constants'),
    DEFAULT_NQ_LEVEL_LOCAL = _require.DEFAULT_NQ_LEVEL_LOCAL,
    DEFAULT_NQ_LEVEL_REMOTE = _require.DEFAULT_NQ_LEVEL_REMOTE;

var inRange = require('./util/index').inRange;

/**
 * {@link NetworkQualityConfigurationImpl} represents an object which notifies its
 * listeners of any changes in the values of its properties.
 * @extends EventEmitter
 * @implements NetworkQualityConfiguration
 * @property {?NetworkQualityVerbosity} local - Verbosity level for {@link LocalParticipant}
 * @property {?NetworkQualityVerbosity} remote - Verbosity level for {@link RemoteParticipant}s
 */

var NetworkQualityConfigurationImpl = function (_EventEmitter) {
  _inherits(NetworkQualityConfigurationImpl, _EventEmitter);

  /**
   * Construct an {@link NetworkQualityConfigurationImpl}.
   * @param {NetworkQualityConfiguration} networkQualityConfiguration - Initial {@link NetworkQualityConfiguration}
   */
  function NetworkQualityConfigurationImpl(networkQualityConfiguration) {
    _classCallCheck(this, NetworkQualityConfigurationImpl);

    var _this = _possibleConstructorReturn(this, (NetworkQualityConfigurationImpl.__proto__ || Object.getPrototypeOf(NetworkQualityConfigurationImpl)).call(this));

    networkQualityConfiguration = Object.assign({ local: 1, remote: 0 }, networkQualityConfiguration);
    Object.defineProperties(_this, {
      local: {
        value: networkQualityConfiguration.local,
        writable: true
      },
      remote: {
        value: networkQualityConfiguration.remote,
        writable: true
      }
    });
    return _this;
  }

  /**
   * Update the verbosity levels for network quality information for
   * {@link LocalParticipant} and {@link RemoteParticipant} with those
   * in the given {@link NetworkQualityConfiguration}.
   * @param {NetworkQualityConfiguration} networkQualityConfiguration - The new {@link NetworkQualityConfiguration}
   * @fires NetworkQualityConfigurationImpl#changed
   */


  _createClass(NetworkQualityConfigurationImpl, [{
    key: 'update',
    value: function update(networkQualityConfiguration) {
      var _this2 = this;

      networkQualityConfiguration = Object.assign({
        local: DEFAULT_NQ_LEVEL_LOCAL,
        remote: DEFAULT_NQ_LEVEL_REMOTE
      }, networkQualityConfiguration);

      [['local', 1, 3, DEFAULT_NQ_LEVEL_LOCAL], ['remote', 0, 3, DEFAULT_NQ_LEVEL_REMOTE]].forEach(function (_ref) {
        var _ref2 = _slicedToArray(_ref, 4),
            localOrRemote = _ref2[0],
            min = _ref2[1],
            max = _ref2[2],
            defaultLevel = _ref2[3];

        _this2[localOrRemote] = typeof networkQualityConfiguration[localOrRemote] === 'number' && inRange(networkQualityConfiguration[localOrRemote], min, max) ? networkQualityConfiguration[localOrRemote] : defaultLevel;
      });
    }
  }]);

  return NetworkQualityConfigurationImpl;
}(EventEmitter);

module.exports = NetworkQualityConfigurationImpl;