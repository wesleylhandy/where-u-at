import React, { Component } from 'react';

export default class Auth extends Component {

  componentDidMount(){
    this.props.updateAuth(true, "test");
    console.log(this.props.location.search)
  }

  render() {
    return null
  }
}