import React, { Component } from 'react';

import GoingButton from './GoingButton.js';

export default class Establishment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishment: props.establishment
    }
  }
  componentDidMount(){
    this.setState({establishment: this.props.establishment});
  }

  componentWillReceiveProps(nextProps){
    this.setState({establishment: nextProps.establishment});
  }
  render(){
    return (
      <div className="establishment-card">
        <a href={this.state.establishment.url} target="_blank">
          <img src={this.state.establishment.imageUrl} alt={`${this.state.establishment.name} Image`}/>
        </a>
        <span><a href={this.state.establishment.url} target="_blank">{this.state.establishment.name}</a></span>
        <GoingButton id={this.state.establishment.yelpId}/>
      </div>
    )
  }
}