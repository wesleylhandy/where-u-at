import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actions';
import moment from 'moment';

import 'raf/polyfill';
import './styles/index.css';

import SearchBar from './Components/SearchBar.js';
import EstablishmentList from './Components/EstablishmentList.js';
// import FriendsList from './Components/FriendsList.js';

import {getYelpToken, unAuthUser} from './utils/helpers.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      access_token: '',
      totalPlaces: 0,
      ...props
    }
    this.logout = this.logout.bind(this);
  }

  componentDidMount() {

    const date = moment().format('MM-DD-YYYY');
    this.props.updateDate(date);

    getYelpToken().then(response=>{
      this.setState({access_token: response.access_token});
    }).catch(err=>alert(err));
    
  }

  logout() {
    unAuthUser().then(response => {
      this.props.removeUser()
    }).catch(err => console.error({logoutError: err}));
  }

  render() {
    return (
      <div className="App">
        <header className="App-header">
          {/*<Logo className="App-logo" alt="logo" /> */}
          <h1 className="App-title">Where U @ ?</h1>
          <h4 className='App-subtitle'>An App for Connecting With Groups of Friends in Public</h4>
          <a className={this.props.auth.isAuth ? "logout" : "hidden"} onClick={this.logout}>
            →Log Out
            <img src={this.props.auth.isAuth ? this.props.auth.user.imageUrl: ''} 
              alt="User Profile" 
              className='profile-image'
            />
          </a>
        </header>
       
        <main>
          <div className='container'>
            <SearchBar {...this.props} access_token={this.state.access_token} />
          </div>
        </main>
        <section>
          <div className='container'>
            <EstablishmentList {...this.props}/>
          </div>
        </section>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
    establishments: state.establishments,
    date: state.date
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;