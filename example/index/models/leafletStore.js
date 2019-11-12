import {observable, action} from 'mobx';

class leafletStoreClass {
  @observable centerLatlng = {
    lat: 31.0,
    lng: 121.0
  };
  @observable makerLatlng = this.centerLatlng;
  @observable zoom = 6;
  @observable maptype = 'ROADMAP';
  @observable showMarkerInfo = true;
  @observable showMenu = false;
  @observable showRoadMap = true;
  @observable showTerrain = false;
  @observable showSatellite = false;

  @action setMakerPosition(makerPosition) {
    this.makerLatlng = makerPosition;
    this.centerLatlng = makerPosition;
  }
  @action setViewportChange(viewport) {
    this.zoom = viewport.zoom;
  }
  @action setShowMenu(showMenu) {
    this.showMenu = showMenu;
  }
  @action setShowMarkerInfo(showMarkerInfo) {
    this.showMenu = false;
    this.showMarkerInfo = showMarkerInfo;
  }
  @action setShowRoadMap(showRoadMap) {
    if(showRoadMap){
      this.showMenu = false;
      this.showSatellite = false;
      this.showTerrain = false;
      this.showRoadMap = showRoadMap;
      this.maptype = 'ROADMAP';
    }
  }
  @action setShowTerrain(showTerrain) {
    if(showTerrain){
      this.showMenu = false;
      this.showRoadMap=false;
      this.showTerrain = showTerrain;
      this.showSatellite = false;
      this.maptype = 'TERRAIN';
    }
  }
  @action setShowSatellite(showSatellite) {
    if(showSatellite){
      this.showMenu = false;
      this.showRoadMap=false;
      this.showSatellite = showSatellite;
      this.showTerrain = false;
      this.maptype = 'HYBRID';
    }
  }
}
const leafletStore = new leafletStoreClass();

export default leafletStore;
