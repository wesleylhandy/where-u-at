const router = require('express').Router();
const passport = require('passport');
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
        Token.findOne().exec(function(err, doc) {
            if(err || !(doc && doc.hasOwnProperty('access_token'))) {
                res.json({access_token: ''})
            } else {
                res.json({access_token: doc.access_token})
            }
        });
    });

    router.post('/saveYelpToken', function(req, res){

        var token = new Token({
            access_token: req.body.access_token, 
            token_type: req.body.token_type, 
            expires_in: req.body.expires_in
        });

        token.save(function(err, data) {
            if(err) {
                res.statusCode = 503;
                res.json(err);
            } else {
                res.json(data);
            }
        })

    })

    router.get('/twitter', passport.authenticate('twitter'));

    router.get('/twitter/callback',
        passport.authenticate('twitter', { failureRedirect: '/' },
            function(req, res) {
                // Successful authentication
                res.json({ user: req.user, isAuth: true });
            })
    );

    router.post('/logout', function(req, res) {
        req.logout();
        res.send({ message: 'Logged Out' });
    });

    app.use('/auth', router);
}