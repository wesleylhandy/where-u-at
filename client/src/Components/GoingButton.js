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
    if(this.state.going){
      this.props.logout();
    } else {
      this.props.login();
    }
  }
  render(){
    return (
      <div className="btn-group">
        <button className="going-btn" onClick={this.handleClick}>Going</button>
        <div className="counter">{this.state.numGoing}</div>
      </div>
    )
  }
}