import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import moment from 'moment';

/**
 * The function is designed to return True or False if the Array includes the value of a string for a given property
 * @param {Object[]} arr - an array of objects
 * @param {String} prop - a string representing a key for the given arr
 * @param {String} str - the search string for the arr
 * @returns {Boolean}
 */
function findWithin(arr, prop, str) {
  var mapped = arr.map(el=>el[prop]);
  return mapped.includes(str);
}

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      numGoing: props.goingPeeps.length,
      yelpId: props.yelpId,
      id: props.id,
      going: props.auth.hasOwnProperty('user') && props.auth.user.hasOwnProperty('name') ? findWithin(props.goingPeeps, 'peep', props.auth.user.name): false,
      user: {...props.auth.user},
      isAuth: props.auth.isAuth
    }

    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.notGoing = this.notGoing.bind(this);
    this.going = this.going.bind(this);
  }
  componentDidMount() {
    console.log({goingPeeps: this.props.goingPeeps})
    this.setState({
      yelpId: this.props.yelpId, 
      id: this.props.id, 
      isAuth: this.props.auth.isAuth, 
      user: {...this.props.auth.user}, 
      numGoing: this.props.goingPeeps.length,
      going: this.props.auth.hasOwnProperty('user') && this.props.auth.user.hasOwnProperty('name') ? findWithin(this.props.goingPeeps, 'peep', this.props.auth.user.name) : false
    });
  }

  componentWillReceiveProps(nextProps) {
 
    this.setState({
      isAuth: nextProps.auth.isAuth, 
      user: {...nextProps.auth.user}, 
      numGoing: nextProps.goingPeeps.length, 
      going: nextProps.auth.hasOwnProperty('user') && nextProps.auth.user.hasOwnProperty('name') ? findWithin(nextProps.goingPeeps, 'peep', nextProps.auth.user.name) :false
    });
  }

  onSuccess = (response) => {
    // console.log({headers: [...response.headers]})
    const token = response.headers.get('x-auth-token') ;
    response.json().then(user => {
      // console.log({user});
      if (token) {
        this.setState({ token: token});
        this.props.addUser(user, true);
        this.props.addGoing(this.state.id, user.name, moment().format('MM-DD-YYYY'), true)
      }
    })
  }

  onFailed = (error) => {
    alert(error);
  }

  notGoing = () => {
    this.props.removeGoing(this.state.id, this.state.user.name, this.state.isAuth);
  }

  going = () => {
  
    this.props.addGoing(this.state.id, this.state.user.name, moment().format('MM-DD-YYYY'), this.state.isAuth)
  }

  renderButton(going) {
    let content = this.state.isAuth && going ?
      (
        <button onClick={this.notGoing} className="going-btn checked" >
            Leave
        </button>
      ) : this.state.isAuth && !going ?
      (
        <button onClick={this.going} className="going-btn" >
          Add Going
        </button>
      ) :
      (
        <TwitterLogin 
          loginUrl="http://localhost:3001/auth/twitter" 
          className='going-btn'
          onFailure={this.onFailed} 
          onSuccess={this.onSuccess} 
          text="Add Going"
          showIcon={false}
          requestTokenUrl="http://localhost:3001/auth/twitter/return" />
      );

    return (
      <div className="Logged In">
        {content}
      </div>
    );

  }
  render(){
    return (
      <div className="btn-group">
        {this.renderButton(this.state.going)}
        <div className="counter">{this.state.numGoing}</div>
      </div>
    )
  }
}