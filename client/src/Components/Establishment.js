import React, { Component } from 'react';

import GoingButton from './GoingButton.js';
import yelpBurst from '../images/Yelp_burst_positive_RGB.png';
import yelp0 from '../images/small_0@2x.png';
import yelp1 from '../images/small_1@2x.png';
import yelp1half from '../images/small_1_half@2x.png';
import yelp2 from '../images/small_2@2x.png';
import yelp2half from '../images/small_2_half@2x.png';
import yelp3 from '../images/small_3@2x.png';
import yelp3half from '../images/small_3_half@2x.png';
import yelp4 from '../images/small_4@2x.png';
import yelp4half from '../images/small_4_half@2x.png';
import yelp5 from '../images/small_5@2x.png';

export default class Establishment extends Component {
  constructor(props) {
    super(props);
    this.state = {
      establishment: {...props.establishment.place.place},
      going: [...props.establishment.going],
      id: props.id
    }
  }
  componentDidMount(){  
    this.setState({ establishment: {...this.props.establishment.place.place}, id: this.props.id, going: [...this.props.establishment.going]});
  }

  componentWillReceiveProps(nextProps){
    this.setState({ establishment: nextProps.establishment.place.place, id: nextProps.id, going: [...nextProps.establishment.going]});
  }

  renderPhoto(imageUrl) {
    if(imageUrl) {
      return <img src={this.state.establishment.imageUrl} alt={`${this.state.establishment.name}`} />
    } else {
      return <span className='nophoto'><i className="fa fa-camera-retro" aria-hidden="true"></i></span>
    }
  }
  getRating(rating) {
    switch(true) {
      case (rating > 4.9) :
        return yelp5;

      case (rating > 4.4) :
        return yelp4half;
      
      case (rating > 3.9) :
        return yelp4;

      case (rating > 3.4) :
        return yelp3half;

      case (rating > 2.9) :
        return yelp3;

      case (rating > 2.4) :
        return yelp2half;

      case (rating > 1.9) :
        return yelp2;

      case (rating > 1.4) :
        return yelp1half;

      case (rating > 0) :
        return yelp1;
      
      default: 
        return yelp0;
      
    }
  }

  renderAddress(address, businessName) {
    return (
      <a href={`https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(businessName)}+${encodeURIComponent(address.join('+'))}&dir_action=navigate`} target="_blank">
        {address.map((el, ind) => ind === 0 ? <span key={ind}>{el}</span> : <div key={ind}>{el}</div>)}
      </a>
    )
  }
  render(){
    return (
      <div className="establishment-card" data-est-id={this.state.id}>
        <a href={this.state.establishment.url} target="_blank">
          {this.renderPhoto(this.state.establishment.imageUrl)} 
        </a>
        <div className="establishment-card__info">
          <div>
            <img className='yelp-burst' src={yelpBurst} alt="Yelp Logo"/>
            <a href={this.state.establishment.url} target="_blank">{this.state.establishment.name}</a>
            <img className='yelp-rating' src={this.getRating(this.state.establishment.rating)} alt={`Yelp Rating: ${this.state.establishment.rating}`}/>
          </div>
          <div className="establishment-card__info--address-block">
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            {this.renderAddress(this.state.establishment.address.display_address, this.state.establishment.name)}   
            </div>
        </div>
        <GoingButton id={this.state.id} yelpId={this.state.establishment.yelpId} goingPeeps={this.state.going} {...this.props}/>
      </div>
    )
  }
}