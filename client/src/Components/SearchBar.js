import React, {Component} from 'react';
import locationImg from "../images/location.png";

export default class SearchBar extends Component {
    constructor(props) {
        super(props);
        this.state = {
            geoLocated: false,
            showTooltip: false,
            searchTerm: ''
        }
        this.hideTooltip = this.hideTooltip.bind(this);
        this.showTooltip = this.showTooltip.bind(this);
        this.getGeolocation = this.getGeolocation.bind(this);
        this.handleKeys = this.handleKeys.bind(this);
        this.handleInput = this.handleInput.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    hideTooltip() {
        this.setState({showTooltip: false});
    }

    showTooltip() {
        if(!this.state.geoLocated) {
            this.setState({showTooltip: true});
        }
    }

    getGeolocation() {
        if(!this.state.geoLocated) {
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
            .then(location => this.setState({ geoLocated: true, searchTerm: `${location.coords.latitude}, ${location.coords.longitude}` }))
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
            return this.handleSubmit(e.target.name);
        }
        if (e.key !== " ") {
            this.setState({geoLocated: false});
        }
    }

    handleInput(e){
        e.preventDefault();
        this.setState({searchTerm: e.target.value});
    }

    handleSubmit(e){
        e.preventDefault();
        alert("Thanks for submitting");
    }

    render() {
        return (
            <div className='search-bar'>
                <form onSubmit={this.handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="search"><img src={locationImg} alt="Label"/></label>
                        <input type="text" name="search" placeholder="Enter Your City" value={this.state.searchTerm} onChange={this.handleInput} onKeyDown={this.handleKeys}/>
                        <button className="search-btn"><i className="fa fa-search" aria-hidden="true"></i>&nbsp;Search</button>
                        <div className="location" onTouchStart={this.showTooltip} onMouseEnter={this.showTooltip} onTouchEnd={this.hideTooltip} onMouseLeave={this.hideTooltip} onClick={this.getGeolocation}>
                            <i className={this.state.geoLocated ? "fa fa-bullseye" : "fa fa-compass"} aria-hidden="true"></i>
                            <div className={this.state.showTooltip ? "tooltip" : "hidden"}>Use Your Current Location</div>
                        </div>
                    </div>
                </form>
            </div>
        )
    }
}