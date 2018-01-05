import React, { Component } from 'react';
import moment from 'moment';

import GoingImages from './GoingImages.js';
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
      goingPeeps: [...props.establishment.going],
      numGoing: props.establishment.going.length,
      id: props.id,
      date: props.date.currentDate
    }
    this.getDateAndManageOldState = this.getDateAndManageOldState.bind(this);
  }
  componentDidMount(){
    this.getDateAndManageOldState();
    // console.log({est: this.props.establishment})  
    this.setState({ 
      establishment: {...this.props.establishment.place.place}, 
      id: this.props.id, 
      goingPeeps: [...this.props.establishment.going],
      numGoing: this.props.establishment.going.length
    });
  }

  componentWillReceiveProps(nextProps){
    if(nextProps.date.currentDate !== this.state.date) {
      this.getDateAndManageOldState();
    }
    const update = {};
    if (nextProps.establishment.going.length !== this.state.numGoing 
        && nextProps.establishment.place.place.yelpId === this.state.establishment.yelpId) {
          console.log({UpdateGoing:nextProps.establishment.going})
      update.goingPeeps = [...nextProps.establishment.going];
      update.numGoing = nextProps.establishment.going.length;
    }
    if(nextProps.establishment.place.place.yelpId !== this.state.establishment.yelpId) {
      update.establishment = nextProps.establishment.place.place;
      update.id = nextProps.id;
      update.goingPeeps = [...nextProps.establishment.going];
      update.numGoing = nextProps.establishment.going.length;
    }
    this.setState(update);

  }

  getDateAndManageOldState = () => {
    const date = moment().format('MM-DD-YYYY');
    if (date !== this.state.date) {
      this.props.updateDate(date);
      this.props.removeOldGoing(this.state.yelpId, date);
    }
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
          <div className='establishment-card__info--yelp'>
            <img className='yelp-burst' src={yelpBurst} alt="Yelp Logo"/>
            <a href={this.state.establishment.url} target="_blank">{this.state.establishment.name}</a>
            <img className='yelp-rating' src={this.getRating(this.state.establishment.rating)} alt={`Yelp Rating: ${this.state.establishment.rating}`}/>
          </div>
          <div className="establishment-card__info--address-block">
            <i className="fa fa-location-arrow" aria-hidden="true"></i>
            {this.renderAddress(this.state.establishment.address.display_address, this.state.establishment.name)}   
            </div>
        </div>
        <GoingButton id={this.state.id} yelpId={this.state.establishment.yelpId} goingPeeps={this.state.goingPeeps} numGoing={this.state.numGoing} {...this.props}/>
        <GoingImages goingPeeps={this.state.goingPeeps} yelpId={this.state.establishment.yelpId} {...this.props}/>
      </div>
    )
  }
}