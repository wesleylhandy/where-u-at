const router = require('express').Router();
const passport = require('passport');
const middleware = require('./../config/middleware');
const User = require('../models/User');

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

    router.get('/auth/twitter', passportTwitter.authenticate('twitter'));

    router.get('/auth/twitter/callback',
        passportTwitter.authenticate('twitter', { failureRedirect: '/' }),
        function(req, res) {
            // Successful authentication
            res.json(req.user);
        });

    app.use('/api', router);
}