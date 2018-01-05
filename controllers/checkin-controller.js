const router = require('express').Router();
const passport = require('passport');
const Place = require('../models/Place');
const User = require('../models/User');

module.exports = function(app) {

    router.get('/going', function(req, res){
        Place.findOne({'place.yelpId': req.query.yelpId})
        .then(function(place){
            const filtered = place.going.filter(function(el) {
                return el.searchDate === req.query.searchDate
            })
            const ids = filtered.map(function(el){
                return el.peep
            });

            if (ids.length) {
                getUsersFromIds(ids).then(function(users){
                    console.log({users});
                    res.json({going: users})
                }).catch(function(err) {
                    if(err) {
                        res.statusCode=503
                        return res.json({ title: 'Error', message: err });
                    }
                })
            } else {
                res.json({going: []});
            }
        })
        .catch(function(err) {
            if(err) {
                res.statusCode=503
                return res.json({ title: 'Error', message: err });
            }
        })
    });

    router.put('/going/add/:yelpId', function(req, res) {
        Place.findOne({'place.yelpId': req.params.yelpId})
        .then(function(place) {
            
            const duplicates = place.going.filter(function(place){return place.searchDate === req.body.searchDate && place.peep.toString() === req.body.peep});

            if(duplicates.length) {
                 return res.json({id: place._id, place: place.place, going: place.going, duplicate: true})
            }
            place.going.push({searchDate: req.body.searchDate, peep: req.body.peep});
            
            place.save(function(err, newPlace) {
                if(err) {
                    res.statusCode=503
                    return res.json({ title: 'Error', message: err });
                }

                res.json({
                    id: newPlace._id, 
                    place: newPlace.place, 
                    going: newPlace.going,
                    duplicate: false
                });
            })

        })
        .catch(function(err) {
            if(err) {
                res.statusCode=503
                return res.json({ title: 'Error', message: err });
            }
        })
    });

    router.put('/going/remove/:yelpId', function(req, res) {
        Place.findOneAndUpdate({'place.yelpId': req.params.yelpId}, {
            $pull : {
                going : {
                    searchDate: req.body.searchDate, peep: req.body.peep
                }
            }
        }, {
            new: true
        }, function(err, newPlace) {
            if (err) {
                res.statusCode = 500;
                return res.json({ title: 'Error', message: err });
            }
            res.json({
                id: newPlace._id, 
                place: newPlace.place, 
                going: newPlace.going
            });
        });
    })

    app.use('/api', router);
}

function getUsersFromIds(ids) {
    return new Promise(function(resolve, reject){
        let len = ids.length;
        const users = [], promises= [];
        for (let i = 0; i < len; i++) {
            promises.push(User.findById(ids[i]))
        }
        Promise.all(promises).then(function(users){
            resolve(users)
        }).catch(function(err){
            reject(err);
        })
    })
}