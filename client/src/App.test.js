import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import { RouterToUrlQuery } from 'react-url-query';
import App from './App';
import 'raf/polyfill';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>
    <RouterToUrlQuery>
      <App />
    </RouterToUrlQuery>
  </BrowserRouter>, div);
});
