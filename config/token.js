const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');
const User = require('../models/User');

const createToken = function(auth) {
    return jwt.sign({
        id: auth.id
    }, process.env.SIGNATURE_SECRET, {
        expiresIn: 60 * 120
    });
};

const generateToken = function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

const sendToken = function(req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

//token handling middleware
const authenticate = expressJwt({
    secret: process.env.SIGNATURE_SECRET,
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

const getCurrentUser = function(req, res, next) {
    User.findById(req.auth.id, function(err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

const getOne = function(req, res) {
    var user = req.user.toObject();

    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};

module.exports = {
    createToken,
    generateToken,
    sendToken,
    authenticate,
    getCurrentUser,
    getOne
}