import React, { Component } from 'react';

import Friend from "./Friend.js";

export default class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  renderFriends() {
    return <Friend />
  }
  render() {
    return (
      <ul>
        {this.renderFriends()}
      </ul>
    )
  }
}