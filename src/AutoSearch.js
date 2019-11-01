import {MapControl} from 'react-leaflet';
import './leaflet-google-places-autocomplete';
import './leaflet-gplaces-autocomplete.css';
const menuUnfold = require('./img/menu_unfold.svg');


export default class AutoSearch extends MapControl {
  static propTypes = {};

  componentWillMount() {
    const {handleClickSearchIcon, updateLocation, handleNoLocation} = this.props;
    this.leafletElement = new window.L.Control.GPlaceAutocomplete({
      clickIcon: handleClickSearchIcon,
      menuUnfold,
      callback(place, map) {
        if (!place.geometry) {
          if (handleNoLocation) {
            handleNoLocation(place);
          }
          return;
        }
        map.panTo([
          place.geometry.location.lat(),
          place.geometry.location.lng()
        ]);
        if (updateLocation) {
          console.warn('updateLocation', updateLocation);
          updateLocation(
            place.geometry.location.lat(),
            place.geometry.location.lng()
          );
        }
      }
    });
  }
}
