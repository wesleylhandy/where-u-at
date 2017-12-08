import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from 'react-router-dom';
import {RouterToUrlQuery} from 'react-url-query';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(
  <BrowserRouter>
    <RouterToUrlQuery>
      <App />
    </RouterToUrlQuery>
  </BrowserRouter>,
  document.getElementById('root')
);

registerServiceWorker();