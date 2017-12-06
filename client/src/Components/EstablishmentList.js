import React, { Component } from 'react';

import Establishment from "./Establishment.js";

export default class EstablishmentList extends Component {
  constructor(props){
    super(props);
    this.state={
      establishments: props.establishments
    }
    this.renderEstablishments = this.renderEstablishments.bind(this);
  }

  componentDidMount() {
    this.setState({establishments: this.props.establishments});
  }

  // componentDidUpdate(){
  //   console.log({updatedEstablishments: this.state.establishments});
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({establishments: nextProps.establishments});
  }

  renderEstablishments(establishments){
    return establishments.map((est, ind)=> <li key={ind}><Establishment establishment={est}/></li>);
  }
  render(){
    return (
      <ul>
        {this.renderEstablishments(this.state.establishments)}
      </ul>
    )
  }
}