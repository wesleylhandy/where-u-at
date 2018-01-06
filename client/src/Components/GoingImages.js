import React, { Component } from 'react';
import {getGoingApi} from "../utils/helpers";

export default class GoingImages extends Component {
    constructor(props) {
        super(props);
        this.state = {
            goingPeeps: [...props.goingPeeps],
            yelpId: props.yelpId
        }
    
    }

    componentDidMount() {
        getGoingApi(this.props.yelpId, this.props.date.currentDate)
            .then(getGoingRes=>{
                this.setState({goingPeeps: [...getGoingRes.going]})
                // console.log({MountGoingImages: getGoingRes})
        }).catch(err=>console.error({err}));
    }

    componentWillReceiveProps(nextProps){
        if(nextProps.goingPeeps.length !== this.state.goingPeeps.length) {
            getGoingApi(nextProps.yelpId, nextProps.date.currentDate)
                .then(getGoingRes=>{
                    this.setState({goingPeeps: [...getGoingRes.going]})
                    // console.log({PropsGoingImages: getGoingRes})
                }).catch(err=>console.error({err}));
        }
    }

    renderImages(peeps){
        return peeps.map((peep, id)=> {
            // console.log({peep})
            return (
                <div key={`img-${id}`}>
                    <img src={peep.imageUrl} alt='User Profile'/>
                </div>
            )
        })
    }

    render() {
        return (<div className='establishment-card__going'>{this.renderImages(this.state.goingPeeps)}</div>)
    }

}