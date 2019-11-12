import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import AutoSearch from '../../../../src/index';
import './index.css';

const landform = require('../../img/landform.svg');
const marker = require('../../img/marker.svg');
const satellite = require('../../img/satellite.svg');
const traffic = require('../../img/traffic.svg');
const foldIcon = require('../../img/menu_fold.svg');

@inject('leafletStore')
@observer
export default class Index extends Component {
  componentDidMount() {
    this.ref.focus();
  }

  render() {
    return (
      <div className='menu-info'>
        <div ref={ref => (this.ref = ref)} className='menu-left' tabIndex='1' onBlur={() => this.props.leafletStore.setShowMenu(false)}>
          <div className='menu-title'>
            <span className='menu-close' onClick={() => this.props.leafletStore.setShowMenu(false)}>
              <span className='menu-view-fold'><img alt='fold' src={foldIcon}/></span>
            </span>
          </div>
          <ul className='menu-setting-list'>
            <li>
              <a
                className={this.props.leafletStore.showMarkerInfo ? 'menu-valid' : ''}
                onClick={() => this.props.leafletStore.setShowMarkerInfo(!this.props.leafletStore.showMarkerInfo)}
              >
                {/* 地图标记*/}
                <span className='menu-view-icon'><img alt='marker' src={marker}/></span><span>Maker</span>
              </a>
            </li>
            <li>
              <a
                className={this.props.leafletStore.showRoadMap ? 'menu-valid' : ''}
                onClick={() => this.props.leafletStore.setShowRoadMap(!this.props.leafletStore.showRoadMap)}
              >
                {/* 实时路况*/}
                <span className='menu-view-icon'><img alt='traffic' src={traffic}/></span><span>RoadMap</span>
              </a>
            </li>
          </ul>
          <ul className='menu-setting-list'>
            <li>
              <a
                className={this.props.leafletStore.showTerrain ? 'menu-valid' : ''}
                onClick={() => this.props.leafletStore.setShowTerrain(!this.props.leafletStore.showTerrain)}
              >
                {/* 地形*/}
                <span className='menu-view-icon'><img alt='landform' src={landform} /></span><span>Terrain</span>
              </a>
            </li>
            <li>
              <a
                className={this.props.leafletStore.showSatellite ? 'menu-valid' : ''}
                onClick={() => this.props.leafletStore.setShowSatellite(!this.props.leafletStore.showSatellite)}
              >
                {/* 卫星*/}
                <span className='menu-view-icon'><img alt='satellite' src={satellite} /></span><span>Satellite</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    );
  }
}
