const router = require('express').Router();
const passport = require('passport');
const yelp = require('yelp-fusion');
const middleware = require('./../config/middleware');
const User = require('../models/User');
const Token = require('../models/Token');

module.exports = function(app) {

    router.get('/session', function(req, res) {
        if (process.env.NODE_ENV !== 'production') {
            //log of session data retrieved from request for setting state
            console.log('----------/api/session----------');
            console.log({ authenticated: req.isAuthenticated() });
            console.log({ user: req.user });
            console.log('--------------------------------');
        }

        if (req.isAuthenticated()) {
            res.json({ user: req.user, isAuth: true })
        } else res.json({ user: req.session.username, isAuth: false })
    });

    router.get('/getYelpToken', function(req, res) {
        Token.findOne().then(function(token) {
            res.json({ access_token: token.access_token })
        }).catch(function(err) {
            console.error(err);
            res.json({
                access_token: ''
            })
        });
    });

    router.get('/newYelpToken', function(req, res) {

        yelp.accessToken(process.env.YELP_CLIENT_ID, process.env.YELP_CLIENT_SECRET)
            .then(function(response) {
                console.log({ response: response.jsonBody })
                    //store the token in DB
                var tokenData = {
                    token_type: response.jsonBody.token_type,
                    access_token: response.jsonBody.access_token,
                    expires_in: response.jsonBody.expires_in
                }

                var token = new Token(tokenData);

                token.save(function(err, data) {
                    if (err) {
                        console.log({ location: 'token.save.err', err: err.message })
                        res.statusCode = 503;
                        res.json({ err: err.message });
                    } else {
                        console.log({ location: 'token.save.data', data: data })
                        res.json(data);
                    }
                })
            }).catch(function(err) {
                console.log({ location: 'yelp.accessToken.catch', err: err });
                res.statusCode = 503;
                res.json({ err: err.message });
            })

    })

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
        passport.authenticate('twitter', {
            successRedirect: '/auth/twittersuccess',
            failureRedirect: '/auth/twitterfail'
        })
    );

    router.get('/twittersuccess', function(req, res) {
        // Successful authentication
        res.json({ user: req.user, isAuth: true });
    })


    router.get('/twitterfail', function(req, res) {
        res.statusCode(503);
        res.json({ err: 'Unable to Validate User Credentials' })
    })

    router.post('/logout', function(req, res) {
        req.logout();
        res.send({ message: 'Logged Out' });
    });

    app.use('/auth', router);
}