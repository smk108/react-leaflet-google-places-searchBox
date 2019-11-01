'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _reactLeaflet = require('react-leaflet');

require('./leaflet-google-places-autocomplete');

require('./leaflet-gplaces-autocomplete.css');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var menuUnfold = require('./img/menu_unfold.svg');

var AutoSearch = function (_MapControl) {
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
          handleNoLocation = _props.handleNoLocation;

      this.leafletElement = new window.L.Control.GPlaceAutocomplete({
        clickIcon: handleClickSearchIcon,
        menuUnfold: menuUnfold,
        callback: function callback(place, map) {
          if (!place.geometry) {
            if (handleNoLocation) {
              handleNoLocation(place);
            }
            return;
          }
          map.panTo([place.geometry.location.lat(), place.geometry.location.lng()]);
          if (updateLocation) {
            console.warn('updateLocation', updateLocation);
            updateLocation(place.geometry.location.lat(), place.geometry.location.lng());
          }
        }
      });
    }
  }]);

  return AutoSearch;
}(_reactLeaflet.MapControl);

AutoSearch.propTypes = {};
exports.default = AutoSearch;
//# sourceMappingURL=AutoSearch.js.map