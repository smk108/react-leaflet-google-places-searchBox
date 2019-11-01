'use strict';

(function () {
  var L = window.L;
  L.GPlaceAutocomplete = {};

  L.Control.GPlaceAutocomplete = L.Control.extend({
    options: {
      position: 'topleft',
      prepend: true,
      collapsed_mode: false,
      autocomplete_options: {}
    },

    collapsedModeIsExpanded: true,

    autocomplete: null,
    icon: null,
    searchBox: null,

    _ready: null,
    _GAPIPromise: null,

    initialize: function initialize(options) {
      if (options) {
        L.Util.setOptions(this, options);
      }
      if (!this.options.callback) {
        this.options.callback = this.onLocationComplete;
      }

      this._ready = !!window.google && !!window.google.maps && !!window.google.maps.Map;
      this._GAPIPromise = this._ready ? Promise.resolve(window.google) : new Promise(function (resolve, reject) {
        var checkCounter = 0;
        var intervalId = null;
        intervalId = setInterval(function () {
          if (checkCounter >= 10) {
            clearInterval(intervalId);
            return reject(new Error('window.google not found after 10 attempts'));
          }
          if (!!window.google && !!window.google.maps && !!window.google.maps.Map) {
            clearInterval(intervalId);
            return resolve(window.google);
          }
          checkCounter++;
        }, 500);
      });

      this._buildContainer();
    },
    _buildContainer: function _buildContainer() {
      var _this = this;

      this._GAPIPromise.then(function () {
        _this._ready = true;

        // build structure
        _this.container = L.DomUtil.create('div', 'leaflet-gac-container leaflet-bar');
        var searchWrapper = L.DomUtil.create('div', 'leaflet-gac-wrapper');
        _this.searchBox = L.DomUtil.create('input', 'leaflet-gac-control');
        _this.searchIcon = L.DomUtil.create('div', 'leaflet-search-icon');
        _this.searchIcon.innerHTML = '<img class="icon-unfold" alt="menu" src=' + _this.options.menuUnfold + '>';
        /*  this.autocomplete = new google.maps.places.Autocomplete(this.searchBox, this.options.autocomplete_options);*/
        // eslint-disable-next-line new-cap
        console.log('new window.google.maps', window.google.maps.places.SearchBox);
        _this.autocomplete = new window.google.maps.places.SearchBox(_this.searchBox);
        // if collapse mode set - create icon and register events
        if (_this.options.collapsed_mode) {
          _this.collapsedModeIsExpanded = false;

          _this.icon = L.DomUtil.create('div', 'leaflet-gac-search-btn');
          L.DomEvent.on(_this.icon, 'click', _this._showSearchBar, _this);

          _this.icon.appendChild(L.DomUtil.create('div', 'leaflet-gac-search-icon'));

          searchWrapper.appendChild(_this.icon);
          L.DomUtil.addClass(_this.searchBox, 'leaflet-gac-hidden');
        }

        if (_this.options.clickIcon) {
          searchWrapper.appendChild(_this.searchIcon);
        }
        searchWrapper.appendChild(_this.searchBox);
        // create and bind autocomplete
        _this.container.appendChild(searchWrapper);
      });
    },


    //* **
    // Collapse mode callbacks
    //* **

    _showSearchBar: function _showSearchBar() {
      this._toggleSearch(true);
    },
    _hideSearchBar: function _hideSearchBar() {
      // if element is expanded, we need to change expanded flag and call collapse handler
      if (this.collapsedModeIsExpanded) {
        this._toggleSearch(false);
      }
    },
    _toggleSearch: function _toggleSearch(shouldDisplaySearch) {
      if (shouldDisplaySearch) {
        L.DomUtil.removeClass(this.searchBox, 'leaflet-gac-hidden');
        L.DomUtil.addClass(this.icon, 'leaflet-gac-hidden');
        this.searchBox.focus();
      } else {
        L.DomUtil.addClass(this.searchBox, 'leaflet-gac-hidden');
        L.DomUtil.removeClass(this.icon, 'leaflet-gac-hidden');
      }
      this.collapsedModeIsExpanded = shouldDisplaySearch;
    },


    //* **
    // Default success callback
    //* **

    onLocationComplete: function onLocationComplete(place, map) {
      // default callback
      if (!place.geometry) {
        // eslint-disable-next-line no-alert
        alert('Location not found');
        return;
      }
      map.panTo([place.geometry.location.lat(), place.geometry.location.lng()]);
    },
    onAdd: function onAdd() {
      // stop propagation of click events
      L.DomEvent.addListener(this.container, 'click', L.DomEvent.stop);
      if (this.options.clickIcon) {
        L.DomEvent.addListener(this.searchIcon, 'click', this.options.clickIcon);
      }
      L.DomEvent.disableClickPropagation(this.container);
      if (this.options.collapsed_mode) {
        // if collapse mode - register handler
        this._map.on('dragstart click', this._hideSearchBar, this);
      }
      return this.container;
    },
    addTo: function addTo(map) {
      var _this2 = this;

      this._GAPIPromise.then(function () {
        _this2._ready = true;
        _this2._map = map;

        var container = _this2._container = _this2.onAdd(map);

        var pos = _this2.options.position;

        // eslint-disable-next-line no-underscore-dangle
        var corner = map._controlCorners[pos];

        L.DomUtil.addClass(container, 'leaflet-control');
        if (_this2.options.prepend) {
          corner.insertBefore(container, corner.firstChild);
        } else {
          corner.appendChild(container);
        }

        var callback = _this2.options.callback;
        var self = _this2;
        /*  google.maps.event.addListener(this.autocomplete, "place_changed", function () {
            callback(_this.autocomplete.getPlace(), map);
          });*/
        console.log('this.autocomplete', _this2.autocomplete);
        _this2.autocomplete.addListener('places_changed', function () {
          var places = self.autocomplete.getPlaces();
          if (places && places.length) {
            callback(places[0], map);
          }
        });
        return _this2;
      });
    }
  });
})();
//# sourceMappingURL=leaflet-google-places-autocomplete.js.map