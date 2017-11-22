import React, { Component } from 'react';

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    this.state={
      numGoing: 0
    }
  }
  render(){
    return (
      <div className="btn-group">
        <button className="going-btn">Going</button>
        <div className="counter">{this.state.numGoing}</div>
      </div>
    )
  }
}