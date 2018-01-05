import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';

import {addGoingApi, removeGoingApi} from "../utils/helpers";

/**
 * Function returns True or False if object includes both the userId & date
 * @param {Object} el - object with searchDate and peep (Mongo ObjectID) properties
 * @param {String} userId - a string representing a userId
 * @returns {Boolean}
 */
function findWithin(el, userId) {
  return el.peep === userId;
}

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      numGoing: props.numGoing,
      yelpId: props.yelpId,
      id: props.id,
      going: props.auth.hasOwnProperty('user') && props.auth.user.hasOwnProperty('name') && props.goingPeeps.filter(el => findWithin(el, props.auth.user._id)).length ? true : false,
      user: {...props.auth.user},
      isAuth: props.auth.isAuth,
      date: props.date.currentDate
    }
    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this);
    this.notGoing = this.notGoing.bind(this);
    this.going = this.going.bind(this);
  }
  componentDidMount() {
    this.setState({
      yelpId: this.props.yelpId, 
      id: this.props.id, 
      isAuth: this.props.auth.isAuth, 
      user: {...this.props.auth.user}, 
      numGoing: this.props.goingPeeps.length,
      going: this.props.auth.hasOwnProperty('user') && this.props.auth.user.hasOwnProperty('name') && this.props.goingPeeps.filter(el => findWithin(el, this.props.auth.user._id)).length ? true : false,
      date: this.props.date.currentDate
    });
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      isAuth: nextProps.auth.isAuth, 
      user: {...nextProps.auth.user}, 
      numGoing: nextProps.goingPeeps.length, 
      going: nextProps.auth.hasOwnProperty('user') && nextProps.auth.user.hasOwnProperty('name') && nextProps.goingPeeps.filter(el => findWithin(el, nextProps.auth.user._id)).length ? true : false,
      date: nextProps.date.currentDate
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
        this.going(this.state.id, user._id, this.state.date, true)
      }
    })
  }

  onFailed = (error) => {
    alert(error);
  }

  notGoing = (date) => {
    removeGoingApi(this.state.yelpId, date, this.state.user._id)
      .then(removeGoingRes=>{
        this.props.removeGoing(this.state.id, this.state.user._id, this.state.isAuth);
        // console.log({removeGoingRes})
      })
      .catch(err=>console.error({removeGoingApiError: err}));
  }

  going = (id, userId, date, isAuth) => {
    addGoingApi(this.state.yelpId, date, userId)
      .then(goingRes=>{
        if (!goingRes.duplicate) {
          this.props.addGoing(id, userId, date, isAuth)
        }
        // console.log({goingRes})
      })
      .catch(err=>console.error({goingApiError: err}));
  }

  renderButton(going) {
    let content = this.state.isAuth && going ?
      (
        <button onClick={() => this.notGoing(this.state.date)} className="going-btn checked" >
            Leave
        </button>
      ) : this.state.isAuth && !going ?
      (
        <button onClick={() => this.going(this.state.id, this.state.user._id, this.state.date, this.state.isAuth)} className="going-btn" >
          Add Going
        </button>
      ) :
      (
        <TwitterLogin 
          loginUrl="/auth/twitter" 
          className='going-btn'
          onFailure={this.onFailed} 
          onSuccess={this.onSuccess} 
          text="Add Going"
          showIcon={false}
          requestTokenUrl="/auth/twitter/return" />
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