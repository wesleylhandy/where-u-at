import React, { Component } from 'react';

import Establishment from "./Establishment.js";

export default class EstablishmentList extends Component {
  constructor(props){
    super(props);
    this.state={}
  }

  renderEstablishments(){
    return <Establishment/>
  }
  render(){
    return (
      <ul>
        {this.renderEstablishments()}
      </ul>
    )
  }
}