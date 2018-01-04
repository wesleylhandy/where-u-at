import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';
import moment from 'moment';

import {addGoingApi, removeGoingApi, getGoingApi} from "../utils/helpers";

/**
 * Function returns True or False if object includes both the userId & date
 * @param {Object} el - object with searchDate and peep (Mongo ObjectID) properties
 * @param {String} userId - a string representing a userId
 * @param {String} date - a string representing a formated date value MM-DD-YYYY
 * @returns {Boolean}
 */
function findWithin(el, userId, date) {
  return el.searchDate === date && el.peep === userId;
}

/**
 * Function returns True or False if the object includes the current date
 * @param {Object} el - object with searchDate and peep (Mongo ObjectID) properties
 * @param {String} date - string representing formatted date value MM-DD-YYYY
 * @returns {Boolean}
 */
function filterOld(el, date) {
  return el.searchDate ===  date;
}

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    const date = moment().format('MM-DD-YYYY');
    this.state={
      numGoing: props.goingPeeps.filter(el => filterOld(el, date)).length,
      yelpId: props.yelpId,
      id: props.id,
      going: props.auth.hasOwnProperty('user') && props.auth.user.hasOwnProperty('name') && props.goingPeeps.filter(el => findWithin(el, props.auth.user._id, date)).length ? true : false,
      user: {...props.auth.user},
      isAuth: props.auth.isAuth,
      date: date
    }
    this.getDateAndManageOldState = this.getDateAndManageOldState.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.notGoing = this.notGoing.bind(this);
    this.going = this.going.bind(this);
  }
  componentDidMount() {
    const date = this.getDateAndManageOldState();
    getGoingApi(this.props.yelpId, date).then(getGoingRes=>console.log({getGoingRes})).catch(err=>console.error({err}));
    this.setState({
      yelpId: this.props.yelpId, 
      id: this.props.id, 
      isAuth: this.props.auth.isAuth, 
      user: {...this.props.auth.user}, 
      numGoing: this.props.goingPeeps.length,
      going: this.props.auth.hasOwnProperty('user') && this.props.auth.user.hasOwnProperty('name') && this.props.goingPeeps.filter(el => findWithin(el, this.props.auth.user._id, date)).length ? true : false
    });
  }

  componentWillReceiveProps(nextProps) {
    const date = this.getDateAndManageOldState();
    this.setState({
      isAuth: nextProps.auth.isAuth, 
      user: {...nextProps.auth.user}, 
      numGoing: nextProps.goingPeeps.length, 
      going: nextProps.auth.hasOwnProperty('user') && nextProps.auth.user.hasOwnProperty('name') && nextProps.goingPeeps.filter(el => findWithin(el, nextProps.auth.user._id, date)).length ? true : false
    });
  }

  getDateAndManageOldState = () => {
    const date = moment().format('MM-DD-YYYY');
    if (date !== this.state.date) {
      this.setState({date: date});
      this.props.removeOldGoing(this.state.yelpId, date);
    }
    
    return date;
  }

  onSuccess = (response) => {
    // console.log({headers: [...response.headers]})
    const token = response.headers.get('x-auth-token') ;
    response.json().then(user => {
      // console.log({user});
      if (token) {
        this.setState({ token: token});
        this.props.addUser(user, true);
        this.going(this.state.id, user._id, moment().format('MM-DD-YYYY'), true)
      }
    })
  }

  onFailed = (error) => {
    alert(error);
  }

  notGoing = (date) => {
    this.props.removeGoing(this.state.id, this.state.user._id, this.state.isAuth);
    removeGoingApi(this.state.yelpId, date, this.state.user._id)
      .then(removeGoingRes=>console.log({removeGoingRes}))
      .catch(err=>console.error({removeGoingApiError: err}));
  }

  going = (id, userId, date, isAuth) => {
    console.log({id})
    this.props.addGoing(id, userId, date, isAuth)
    addGoingApi(this.state.yelpId, date, userId)
      .then(goingRes=>console.log({goingRes}))
      .catch(err=>console.error({goingApiError: err}));
  }

  renderButton(going) {
    let date = moment().format('MM-DD-YYYY');
    let content = this.state.isAuth && going ?
      (
        <button onClick={() => this.notGoing(date)} className="going-btn checked" >
            Leave
        </button>
      ) : this.state.isAuth && !going ?
      (
        <button onClick={() => this.going(this.state.id, this.state.user._id, date, this.state.isAuth)} className="going-btn" >
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