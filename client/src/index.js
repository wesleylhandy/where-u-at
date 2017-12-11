import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {RouterToUrlQuery} from 'react-url-query';
import {Provider} from 'react-redux';
import {store} from './state/store.js'; 
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <RouterToUrlQuery>
        <App />
      </RouterToUrlQuery>
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);

registerServiceWorker();