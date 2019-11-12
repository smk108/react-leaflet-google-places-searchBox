import React from 'react';
import ReactDOM from 'react-dom';
import {configure} from 'mobx';
import {Provider} from 'mobx-react';
import leafletStore from './models/leafletStore';
import App from './components/App';
import './style.css';

const stores = {
  leafletStore
};

// 状态始终需要通过动作来更新(实际上还包括创建)
configure({'enforceActions': 'always'});

ReactDOM.render((
    <Provider {...stores}>
        <App />
    </Provider>
  ), document.getElementById('root'));
