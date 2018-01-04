import React, {Component} from 'react';
import locationImg from "../images/location.png";

import {getYelpResults} from '../utils/helpers';

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geolocated: props.search.geolocated,
            showTooltip: false,
            searchTerm: typeof props.search.current_search === 'object' ? Object.values(props.search.current_search).join(', ') : props.search.current_search,
            access_token: props.access_token,
            totalPlaces: 0
        }
        this.hideTooltip = this.hideTooltip.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.getGeolocation = this.getGeolocation.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.getBusinesses = this.getBusinesses.bind(this);
        
    }

    componentDidMount() {
        this.input.value = typeof this.props.search.current_search === 'object' ? Object.values(this.props.search.current_search).join(', ') : this.props.search.current_search
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.search.current_search !== this.state.searchTerm) {
            this.setState({ searchTerm: typeof nextProps.search.current_search === 'object' ? Object.values(nextProps.search.current_search).join(', ') : nextProps.search.current_search});
            this.input.value = typeof nextProps.search.current_search === 'object' ? Object.values(nextProps.search.current_search).join(', ') : nextProps.search.current_search;
        }
        if (nextProps.access_token !== this.state.access_token) {
            this.setState({ access_token: nextProps.access_token });
        }
    }

    hideTooltip() {
        this.setState({showTooltip: false});
    }

    showTooltip() {
        if(!this.state.geolocated) {
            this.setState({showTooltip: true});
        }
    }

    getGeolocation() {
        if(!this.state.geolocated) {
            const geolocation = navigator.geolocation;
            function getLocation() {
                return new Promise((resolve, reject)=>{
                    if(!geolocation) {
                        reject('Not Supported');
                    }
                    geolocation.getCurrentPosition(function(position){resolve(position)}, function(){reject('Permission Denied')});
                });
            }

            getLocation()
            .then(location => {
                this.setState({ geolocated: true});
                this.input.value =  `${location.coords.latitude}, ${location.coords.longitude}`
            })
            .catch(err=>{
                if(err) {
                    alert(err);
                }
            });
        }
    }

    handleKeys(e) {
        if (e.key === "Enter") {
            e.preventDefault();
            return this.handleSubmit(e);
        }
        if (e.key !== " ") {
            this.setState({geolocated: false});
        }
    }

    handleInput(e){
        e.preventDefault();
        this.setState({searchTerm: this.input.value});
    }

    handleSubmit(e){
        e.preventDefault();
        this.props.removeEstablishments();
    
        const search = this.input.value.trim();

        const geolocation = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?),\s*[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/.test(search);

        let latitude = '', longitude = '';
        if(geolocation) {
            latitude = search.split(',')[0].trim();
            longitude = search.split(',')[1].trim();
        }
        this.props.addSearch(geolocation ? { latitude, longitude } : search, geolocation);
        this.getBusinesses(geolocation ? {latitude, longitude} : search, geolocation)
    }
    /**
     * calls YELP API which will update state if any results are found
     * @param {Object|String} location 
     * @param {Boolean} geolocated 
     */
    getBusinesses(location, geolocated) {

        var access_token = this.state.access_token || '';
        if (access_token) {
            getYelpResults(geolocated, location, access_token).then(response => {

                // console.log({yelpResults: response.places.map((place, id)=> {return {id, place}})});
                this.props.addEstablishments(response.places.map((place, id) => { 
                    return { id, place } 
                }));
                this.setState({totalPlaces: parseInt(response.totalPlaces, 10) });
                console.log({ searchTotal: response.totalPlaces });

            }).catch(err => {
                alert(err);
                this.props.removeSearch();
            });
        }
    }

    render() {
        return (
            <div className='search-bar'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="search"><img src={locationImg} alt="Label"/></label>
                        <input type="text" name="search" placeholder="Enter Your City" ref={node => this.input = node} onChange={this.handleInput} onKeyDown={this.handleKeys} />
                        <button className="search-btn"><i className="fa fa-search" aria-hidden="true"></i>&nbsp;Search</button>
                        <div className="location" onTouchStart={this.showTooltip} onMouseEnter={this.showTooltip} onTouchEnd={this.hideTooltip} onMouseLeave={this.hideTooltip} onClick={this.getGeolocation}>
                            <i className={this.state.geolocated ? "fa fa-bullseye" : "fa fa-compass"} aria-hidden="true"></i>
                            <div className={this.state.showTooltip ? "tooltip" : "hidden"}>Use Your Current Location</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}