import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import {Map, ZoomControl, Marker} from 'react-leaflet';
import autobind from 'class-autobind';
import {GoogleLayer} from 'react-leaflet-google';
import AutoSearch from '../../../../src/index';
import './index.css';

const unfoldIcon = require('../../img/menu_unfold.svg');
// const foldIcon = require('../../img/menu_fold.svg');

const googlekey = ''; // google api key
// const L = window.L;

@inject('leafletStore')
@observer
export default class LeafletMapView extends Component {
  constructor(props) {
    super(props);
    autobind(this, LeafletMapView.prototype);
    this.state = {};
  }
  onMapClick(evt) {
    this.props.leafletStore.setMakerPosition(evt.latlng);
  }

  updatePosition() {
    const {lat, lng} = this.marker.leafletElement.getLatLng();
    this.props.leafletStore.setMakerPosition({lat, lng});
  }

  render() {
    const styleObj = {width: '100%', height: '100%'};
    return (
      <Map
        center={this.props.leafletStore.centerLatlng}
        zoom={this.props.leafletStore.zoom}
        zoomControl={false}
        onClick={this.onMapClick}
        ref='map'
        onViewportChanged={viewport => this.props.leafletStore.setViewportChange(viewport)}
        style={styleObj}
      >
        <GoogleLayer
          key={`maptype_${this.props.leafletStore.maptype}`}
          googlekey={googlekey}
          libraries={['geometry', 'drawing', 'places']}
          maptype={this.props.leafletStore.maptype}
        />
        <AutoSearch
          unfoldIcon={unfoldIcon}
          handleClickSearchIcon={() => this.props.leafletStore.setShowMenu(true)}
          updateLocation={(lat, lng) => this.props.leafletStore.setMakerPosition({lat, lng})}
        />
        {this.props.leafletStore.showMarkerInfo ?
          <Marker
            draggable
            onDragend={this.updatePosition}
            position={this.props.leafletStore.makerLatlng}
          /> : null
        }
        <ZoomControl position='topright' />
      </Map>
    );
  }
}
