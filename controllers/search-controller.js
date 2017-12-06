const router = require('express').Router();
const yelp = require('yelp-fusion');
// const Place = require('../models/Place');

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
                    return { yelpId: business.id, name: business.name, imageUrl: business.image_url, url: business.url, rating: business.rating, address: business.location }
                })
                // add logic for adding new businesses to DB to check to see if anyone is already going to this location
            res.json({ totalPlaces: response.jsonBody.total, places: mapped });
        }).catch(function(err) {
            console.error({ yelpAPIError: err });
            res.statusCode(503);
            res.json({ error: err })
        })
    })
    app.use('/search', router);
}