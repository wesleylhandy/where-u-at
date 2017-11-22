import React, { Component } from 'react';

import GoingButton from './GoingButton.js';

export default class Establishment extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }
  render(){
    return (
      <div>
        <span>Establishment</span>
        <GoingButton/>
      </div>
    )
  }
}