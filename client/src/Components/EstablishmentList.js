import React, { Component } from 'react';

import Establishment from "./Establishment.js";

export default class EstablishmentList extends Component {
  constructor(props){
    super(props);
    this.state={
      establishments: props.establishments,
      isAuth: props.isAuth,
      userId: props.userId
    }
    this.renderEstablishments = this.renderEstablishments.bind(this);
  }

  componentDidMount() {
    this.setState({establishments: this.props.establishments, isAuth: this.props.isAuth, userId: this.props.userId});
  }

  // componentDidUpdate(){
  //   console.log({updatedEstablishments: this.state.establishments});
  // }

  componentWillReceiveProps(nextProps) {
    this.setState({ establishments: nextProps.establishments, isAuth: nextProps.isAuth, userId: nextProps.userId});
  }

  renderEstablishments(establishments, isAuth, userId){
    return establishments.map((est, ind)=> (
      <li key={ind}>
        <Establishment establishment={est} isAuth={isAuth} userId={userId} login={this.props.login} logout={this.props.logout}/>
      </li>
      )
    );
  }
  render(){
    return (
      <ul>
        {this.renderEstablishments(this.state.establishments, this.state.isAuth, this.state.userId)}
      </ul>
    )
  }
}