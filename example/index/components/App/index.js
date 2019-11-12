import React, {Component} from 'react';
import {inject, observer} from 'mobx-react';
import MenuView from '../MenuView';
import LeafletMapView from '../LeafletMapview';
import './index.css';

@inject('leafletStore')
@observer
class App extends Component {
  render() {
    const {showMenu}=this.props.leafletStore;
    return (
      <div className='App'>
        <LeafletMapView />
        {
          !showMenu ? null :
            <MenuView />
        }
      </div>
    );
  }
}

export default App;
