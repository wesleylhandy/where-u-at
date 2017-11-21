import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/index.css';

import SearchBar from './Components/SearchBar.js';

class App extends Component {
  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Where U @ ?</h1>
          <h4 className='App-subtitle'>An App for Connecting With Groups of Friends in Public</h4>
        </header>
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
        <main>
          <SearchBar />
        </main>
      </div>
    );
  }
}

export default App;
