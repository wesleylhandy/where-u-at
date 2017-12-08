import React, { Component } from 'react';

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      numGoing: 0,
      yelpId: props.yelpId,
      going: false,
      userId: props.userId,
      isAuth: props.isAuth
    }
    this.handleClick=this.handleClick.bind(this);
  }
  componentDidMount() {
    this.setState({yelpId: this.props.yelpId, isAuth: this.props.isAuth, userId: this.props.userId});
  }

  componentWillReceiveProps(nextProps) {
    this.setState({isAuth: nextProps.isAuth, userId: nextProps.userId });
  }
  handleClick(){
      this.props.logout();
  }

  renderButton(isAuth) {
    if (isAuth) return <button className="going-btn checked" onClick={this.handleClick}>Going</button>
    else return <a className="going-btn" href="http://127.0.0.1:3001/auth/twitter">Select</a>
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