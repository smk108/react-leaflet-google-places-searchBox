'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = undefined;

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _class, _temp;

var _reactLeaflet = require('react-leaflet');

require('./leaflet-google-places-autocomplete');

require('./leaflet-gplaces-autocomplete.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuUnfold = require('./img/menu_unfold.svg');

var AutoSearch = (_temp = _class = function (_MapControl) {
  _inherits(AutoSearch, _MapControl);

  function AutoSearch() {
    _classCallCheck(this, AutoSearch);

    return _possibleConstructorReturn(this, (AutoSearch.__proto__ || Object.getPrototypeOf(AutoSearch)).apply(this, arguments));
  }

  _createClass(AutoSearch, [{
    key: 'componentWillMount',
    value: function componentWillMount() {
      var _props = this.props,
          handleClickSearchIcon = _props.handleClickSearchIcon,
          updateLocation = _props.updateLocation,
          handleNoLocation = _props.handleNoLocation,
          unfoldIcon = _props.unfoldIcon;

      this.leafletElement = new window.L.Control.GPlaceAutocomplete(Object.assign(_extends({}, this.props), {
        clickIcon: handleClickSearchIcon,
        menuUnfold: unfoldIcon || menuUnfold,
        callback: function callback(place, map) {
          if (!place.geometry) {
            if (handleNoLocation) {
              handleNoLocation(place);
            }
            return;
          }
          map.panTo([place.geometry.location.lat(), place.geometry.location.lng()]);
          if (updateLocation) {
            updateLocation(place.geometry.location.lat(), place.geometry.location.lng());
          }
        }
      }));
    }
  }]);

  return AutoSearch;
}(_reactLeaflet.MapControl), _class.propTypes = {}, _temp);
exports.default = AutoSearch;
//# sourceMappingURL=AutoSearch.js.map