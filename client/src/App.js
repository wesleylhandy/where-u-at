import React, { Component } from 'react';
import logo from './logo.svg';
import './styles/index.css';

import SearchBar from './Components/SearchBar.js';
import EstablishmentList from './Components/EstablishmentList.js';
import FriendsList from './Components/FriendsList.js';

import {getYelpToken, getYelpResults} from './utils/helpers.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      isAuth: false,
      userId: '',
      places:[],
      access_token: ''
    }
    this.getBusinesses=this.getBusinesses.bind(this);
  }

  componentDidMount() {
    getYelpToken().then(response=>{
      this.setState({access_token: response.access_token});
    }).catch(err=>alert(err))
  }

  // componentDidUpdate() {
  //   console.log({updatedPlaces: this.state.places});
  // }

  getBusinesses(geolocated, location){
    var access_token = this.state.access_token || '';
    if(access_token) {
      getYelpResults(geolocated, location, access_token).then(response=>{
        this.setState({places: response.places});
      }).catch(err=>alert(err));
    } 
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1 className="App-title">Where U @ ?</h1>
          <h4 className='App-subtitle'>An App for Connecting With Groups of Friends in Public</h4>
        </header>
       
        <main>
          <div className='container'>
            <SearchBar getBusinesses={this.getBusinesses} />
          </div>
        </main>
        <section>
          <div className='container'>
            <EstablishmentList establishments={this.state.places}/>
          </div>
        </section>
        <aside className={this.state.isAuth ? '' : 'hidden'}>
          <FriendsList />
        </aside>
      </div>
    );
  }
}

export default App;
