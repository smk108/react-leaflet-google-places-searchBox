(function() {
  const L = window.L;
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

    initialize(options) {
      if (options) {
        L.Util.setOptions(this, options);
      }
      if (!this.options.callback) {
        this.options.callback = this.onLocationComplete;
      }


      this._ready = !!window.google && !!window.google.maps && !!window.google.maps.Map;
      this._GAPIPromise = this._ready ? Promise.resolve(window.google) : new Promise(((resolve, reject) => {
        let checkCounter = 0;
        let intervalId = null;
        intervalId = setInterval(() => {
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
      }));


      this._buildContainer();
    },

    _buildContainer() {
      this._GAPIPromise.then(() => {
        this._ready = true;

        // build structure
        this.container = L.DomUtil.create('div', 'leaflet-gac-container leaflet-bar');
        const searchWrapper = L.DomUtil.create('div', 'leaflet-gac-wrapper');
        this.searchBox = L.DomUtil.create('input', 'leaflet-gac-control');
        this.searchIcon = L.DomUtil.create('div', 'leaflet-search-icon');
        this.searchIcon.innerHTML = `<img class="icon-unfold" alt="menu" src=${this.options.menuUnfold}>`;
        /*  this.autocomplete = new google.maps.places.Autocomplete(this.searchBox, this.options.autocomplete_options);*/
        // eslint-disable-next-line new-cap
        this.autocomplete = new window.google.maps.places.SearchBox(this.searchBox);
        // if collapse mode set - create icon and register events
        if (this.options.collapsed_mode) {
          this.collapsedModeIsExpanded = false;

          this.icon = L.DomUtil.create('div', 'leaflet-gac-search-btn');
          L.DomEvent
            .on(this.icon, 'click', this._showSearchBar, this);

          this.icon.appendChild(
            L.DomUtil.create('div', 'leaflet-gac-search-icon')
          );

          searchWrapper.appendChild(
            this.icon
          );
          L.DomUtil.addClass(this.searchBox, 'leaflet-gac-hidden');
        }

        if (this.options.clickIcon) {
          searchWrapper.appendChild(
            this.searchIcon
          );
        }
        searchWrapper.appendChild(
          this.searchBox
        );
        // create and bind autocomplete
        this.container.appendChild(
          searchWrapper
        );
      });
    },

    //* **
    // Collapse mode callbacks
    //* **

    _showSearchBar() {
      this._toggleSearch(true);
    },

    _hideSearchBar() {
      // if element is expanded, we need to change expanded flag and call collapse handler
      if (this.collapsedModeIsExpanded) {
        this._toggleSearch(false);
      }
    },

    _toggleSearch(shouldDisplaySearch) {
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

    onLocationComplete(place, map) {
      // default callback
      if (!place.geometry) {
        // eslint-disable-next-line no-alert
        alert('Location not found');
        return;
      }
      map.panTo([
        place.geometry.location.lat(),
        place.geometry.location.lng()
      ]);
    },

    onAdd() {
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

    addTo(map) {
      this._GAPIPromise.then(() => {
        this._ready = true;
        this._map = map;

        const container = this._container = this.onAdd(map);


        const pos = this.options.position;


        // eslint-disable-next-line no-underscore-dangle
        const corner = map._controlCorners[pos];

        L.DomUtil.addClass(container, 'leaflet-control');
        if (this.options.prepend) {
          corner.insertBefore(container, corner.firstChild);
        } else {
          corner.appendChild(container);
        }

        const callback = this.options.callback;
        const self = this;
        /*  google.maps.event.addListener(this.autocomplete, "place_changed", function () {
            callback(_this.autocomplete.getPlace(), map);
          });*/
        this.autocomplete.addListener('places_changed', () => {
          const places = self.autocomplete.getPlaces();
          if (places && places.length) {
            callback(places[0], map);
          }
        });
        return this;
      });
    }


  });
}());
