import React, { Component } from 'react';
import {Route} from 'react-router-dom';
import 'raf/polyfill';
import './styles/index.css';

import SearchBar from './Components/SearchBar.js';
import EstablishmentList from './Components/EstablishmentList.js';
import FriendsList from './Components/FriendsList.js';
import Auth from './Components/Auth.js';
// import Logo from './Components/Logo.js';

import {getYelpToken, getYelpResults, authUser, unAuthUser, getSession} from './utils/helpers.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      store: props.store,
      isAuth: false,
      userId: '',
      places:[],
      access_token: '',
      current_search: null,
      current_geolocated: false,
      totalPlaces: 0
    }
    this.getBusinesses=this.getBusinesses.bind(this);
    this.login=this.login.bind(this);
    this.logout=this.logout.bind(this);
    this.updateAuth=this.updateAuth.bind(this);
  }

  componentDidMount() {
    this.setState({store: this.props.store});
    getYelpToken().then(response=>{
      this.setState({access_token: response.access_token});
    }).catch(err=>alert(err));
    
    getSession()
      .then(res => {
        this.setState({ userId: res.user, isAuth: res.isAuth })
        this.state.store.dispatch({
          type: "ADD_USER",
          userId: res.user,
          isAuth: res.isAuth
        });
      })
      .catch(err => console.error(err));
  }

  // componentDidUpdate() {
  //   console.log({updatedPlaces: this.state.places});
  // }

  getBusinesses(geolocated, location){
    var access_token = this.state.access_token || '';
    if(access_token) {
      getYelpResults(geolocated, location, access_token).then(response=>{
        this.setState({places: response.places, current_search: location, current_geolocated: geolocated, totalPlaces: parseInt(response.totalPlaces, 10)});
        console.log({searchTotal: response.totalPlaces});
        response.places.forEach((place, index)=>this.state.store.dispatch({
          type: 'ADD_ESTABLISHMENT',
          id: index,
          data: place
        }))
      }).catch(err=>alert(err));
    } 
  }

  updateAuth(bool, userId) {
    this.setState({ isAuth: bool, userId: userId });
  }

  login() {
    authUser().then(response=>{
      this.setState({isAuth: true, userId: response.user});
      this.state.store.dispatch({
        type: "ADD_USER",
        userId: response.user,
        isAuth: response.isAuth
      });
    }).catch(err => alert(err));
  }
  logout() {
    unAuthUser().then(response=>{
      this.setState({isAuth: false, userId: ''})
    }).catch(err => alert(err));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<Logo className="App-logo" alt="logo" /> */}
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
            <EstablishmentList establishments={this.state.places} isAuth={this.state.isAuth} userId={this.state.userId} login={this.login} logout={this.logout}/>
          </div>
        </section>
        <Route path="/callback" render={props => <Auth updateAuth={this.updateAuth} {...props} />}></Route>
        <aside className={this.state.isAuth ? '' : 'hidden'}>
          <FriendsList isAuth={this.state.isAuth} userId={this.state.userId}/>
        </aside>
      </div>
    );
  }
}

export default App;
