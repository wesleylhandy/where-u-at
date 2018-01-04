const router = require('express').Router();
const yelp = require('yelp-fusion');
const Place = require('../models/Place');
const moment = require('moment');

module.exports = function(app) {
    router.get('/locations/:location/:accessToken', function(req, res) {
        const geolocated = req.query.geolocated.toString() === 'true' ? true : false;
        let longitude, latitude, location = req.params.location;
        if (geolocated) {
            location = JSON.parse(location);
            longitude = location.longitude;
            latitude = location.latitude;
        }
        const client = yelp.client(req.params.accessToken);
        client.search({
            term: 'coffee',
            location: geolocated ? null : location,
            longitude: geolocated ? longitude : null,
            latitude: geolocated ? latitude : null,
            categories: 'coffee,cafes,nightlife,bars,beer_and_wine,breweries,cocktailbars,pubs',
            attributes: 'WiFi.free,HappyHour',
            sort_by: 'rating'
        }).then(function(response) {
            const businesses = response.jsonBody.businesses;

            const mapped = businesses.map(function(business) {
                return {
                    place: {
                        yelpId: business.id,
                        name: business.name,
                        imageUrl: business.image_url,
                        url: business.url,
                        rating: business.rating,
                        address: business.location
                    }
                }
            });

            upsertPlaces(mapped).then(function(places) {
                res.json({ totalPlaces: response.jsonBody.total, places })
            }).catch(function(err) { throw new Error({ upsertError: err }) })


        }).catch(function(err) {
            console.error({ yelpAPIError: err });
            res.statusCode(503);
            res.json({ error: err })
        })
    })
    app.use('/search', router);
}

function upsertPlaces(places) {
    return new Promise(function(resolve, reject) {
        const len = places.length;
        const placesArray = [];
        const errors = [];

        for (let i = 0; i < len; i++) {

            Place.findOneAndUpdate({ 'place.yelpId': places[i].place.yelpId }, {place: places[i].place}, { new: true, upsert: true }, function(err, insertedPlace) {
                if (err) { errors.push({ findOneAndUpdateError: err }) }

                placesArray.push({
                    id: insertedPlace._id,
                    place: insertedPlace.place,
                    going: insertedPlace.going.filter(function(pl) {
                        pl.searchDate === moment().format('MM-DD-YYYY')
                    })
                });

                if (placesArray.length === len) { resolve(placesArray) }
            });
        }

        if (errors.length === len) reject(errors);
    })
}