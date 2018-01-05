const router = require('express').Router();
const passport = require('passport');
const yelp = require('yelp-fusion');
const Token = require('../models/Token');
const request = require('request');

const { generateToken, sendToken } = require('../config/token');

module.exports = function(app) {

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

    router.route('/twitter')
        .post(function(req, res, next) {
            request.post({
                url: `https://api.twitter.com/oauth/access_token?oauth_verifier`,
                oauth: {
                    consumer_key: process.env.TWITTER_CONSUMER_KEY,
                    consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
                    token: req.query.oauth_token
                },
                form: { oauth_verifier: req.query.oauth_verifier }
            }, function(err, r, body) {
                if (err) {
                    return res.status(500).send({ message: err.message });
                }

                const bodyString = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
                const parsedBody = JSON.parse(bodyString);

                req.body['oauth_token'] = parsedBody.oauth_token;
                req.body['oauth_token_secret'] = parsedBody.oauth_token_secret;
                req.body['user_id'] = parsedBody.user_id;

                next();
            });
        }, passport.authenticate('twitter-token'), function(req, res, next) {
            if (!req.user) {
                return res.status(401).send('User Not Authenticated');
            }
            // prepare token for API
            req.auth = {
                id: req.user.id
            };

            return next();
        }, generateToken, sendToken);

    router.route('/twitter/return')
        .post(function(req, res) {
            request.post({
                url: 'https://api.twitter.com/oauth/request_token',
                oauth: {
                    oauth_callback: "https%3A%2F%2Fwhere-u-at.herokuapp.com%2Ftwitter-callback",
                    consumer_key: process.env.TWITTER_CONSUMER_KEY,
                    consumer_secret: process.env.TWITTER_CONSUMER_SECRET
                }
            }, function(err, r, body) {
                if (err) {

                    return res.status(500).send({ message: err.message });

                }

                const oauthParams = body.split('&');
                const oauth_token = oauthParams[0].split('=')[1];
                const oauth_token_secret = oauthParams[1].split('=')[1];

                var jsonStr = '{ "' + body.replace(/&/g, '", "').replace(/=/g, '": "') + '"}';
                res.send(JSON.parse(jsonStr));
            });
        });

    router.post('/logout', function(req, res) {
        req.logout();

        res.json({ user: null, isAuth: false });
    });

    app.use('/auth', router);
}