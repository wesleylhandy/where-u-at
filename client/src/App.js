import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as actionCreators from './actions/actions';

import 'raf/polyfill';
import './styles/index.css';

import SearchBar from './Components/SearchBar.js';
import EstablishmentList from './Components/EstablishmentList.js';
import FriendsList from './Components/FriendsList.js';

import {getYelpToken, getSession} from './utils/helpers.js';

class App extends Component {
  constructor(props){
    super(props);
    this.state={
      access_token: '',
      totalPlaces: 0,
      ...props
    }

  }

  componentDidMount() {
    // console.log({InitialState: this.state});

    getYelpToken().then(response=>{
      this.setState({access_token: response.access_token});
    }).catch(err=>alert(err));
    
    getSession()
      .then(res => {
        this.props.addUser(res.user, res.isAuth === true ? true : false);
      })
      .catch(err => console.error(err));

    // console.log(window.location.search);

  }

  componentDidUpdate() {
    console.log(window.location.search);
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
            <SearchBar {...this.props} access_token={this.state.access_token} />
          </div>
        </main>
        <section>
          <div className='container'>
            <EstablishmentList {...this.props}/>
          </div>
        </section>
        <aside className={this.props.auth.isAuth ? '' : 'hidden'}>
          <FriendsList {...this.props}/>
        </aside>
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {
    auth: state.auth,
    search: state.search,
    establishments: state.establishments
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(actionCreators, dispatch);
}

const Main = connect(mapStateToProps, mapDispatchToProps)(App);

export default Main;
