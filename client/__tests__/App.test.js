import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
import App from '../src/App';
import 'raf/polyfill';

it('renders without crashing', () => {
  const div = document.createElement('div');
  ReactDOM.render(
  <BrowserRouter>

      <App />

  </BrowserRouter>, div);
});
