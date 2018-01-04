const router = require('express').Router();
const passport = require('passport');
const Place = require('../models/Place');


module.exports = function(app) {
    router.put('/going/add/:yelpId', function(req, res) {
        Place.findOneAndUpdate({'place.yelpId': req.params.yelpId}, 
        {
            'place.going': {
                push: {
                    searchDate: req.body.searchDate,
                    peep: req.body.peep
                }
            }
        }, {new: true}, function(err, place) {
            if(err) {
                return res.status(503).send(err)
            }
            console.log({addGoing: place})
            res.json({
                id: place._id, 
                place: place.place, 
                going: place.going.filter(function(el) {
                    el.searchDate === req.body.searchDate
                }) 
            });
        })
    });

    app.use('/api', router);
}