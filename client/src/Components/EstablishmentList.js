import React, { Component } from 'react';

import Establishment from "./Establishment.js";

export default class EstablishmentList extends Component {
  constructor(props){
    super(props);
    this.state={
      establishments: props.establishments,
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
    this.setState({ establishments: nextProps.establishments, isAuth: nextProps.auth.isAuth, userId: nextProps.auth.userId});
  }

  renderEstablishments(establishments = []){
    console.log({establishments})
     return establishments.map(est=> (
      <li key={est.id}>
        <Establishment establishment={est} id={est.id} {...this.props}/>
      </li>
      )
    );
  }
  render(){
    return (
      <ul>
        {this.renderEstablishments(this.state.establishments)}
      </ul>
    )
  }
}