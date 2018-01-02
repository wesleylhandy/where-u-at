import React, { Component } from 'react';
import TwitterLogin from 'react-twitter-auth';

import {authUser} from '../utils/helpers';

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      numGoing: 0,
      yelpId: props.yelpId,
      going: false,
      user: props.userId,
      isAuth: props.isAuth
    }
    this.handleClick=this.handleClick.bind(this);
    this.onFailed = this.onFailed.bind(this);
    this.onSuccess = this.onSuccess.bind(this)l
    this.logout = this.logout.bind(this);
  }
  componentDidMount() {
    this.setState({yelpId: this.props.yelpId, isAuth: this.props.isAuth, userId: this.props.userId});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isAuth: nextProps.isAuth, userId: nextProps.userId });
  }
  handleClick(){
      authUser().then(res=> console.log({res})).catch(err=> console.error({err}));
  }

  onSuccess = (response) => {
    const token = response.headers.get('x-auth-token');
    response.json().then(user => {
      if (token) {
        this.setState({ isAuth: true, user: user, token: token });
      }
    });
  };

  onFailed = (error) => {
    alert(error);
  };

  logout = () => {
    this.setState({ isAuth: false, token: '', user: null })
  };

  renderButton(isAuth) {
    let content = !!isAuth ?
      (
        <div>
          <p>Authenticated</p>
          <div>
            {this.state.user.email}
          </div>
          <div>
            <button onClick={this.logout} className="button" >
              Log out
          </button>
          </div>
        </div>
      ) :
      (
        <TwitterLogin loginUrl="http://localhost:3001/auth/twitter"
          onFailure={this.onFailed} onSuccess={this.onSuccess}
          requestTokenUrl="http://localhost:3001//auth/twitter/return" />
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
        {this.renderButton(this.state.isAuth)}
        <div className="counter">{this.state.numGoing}</div>
      </div>
    )
  }
}