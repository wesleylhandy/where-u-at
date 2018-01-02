const jwt = require('jsonwebtoken');
const expressJwt = require('express-jwt');

exports.createToken = function(auth) {
    return jwt.sign({
        id: auth.id
    }, 'my-secret', {
        expiresIn: 60 * 120
    });
};

exports.generateToken = function(req, res, next) {
    req.token = createToken(req.auth);
    return next();
};

exports.sendToken = function(req, res) {
    res.setHeader('x-auth-token', req.token);
    return res.status(200).send(JSON.stringify(req.user));
};

//token handling middleware
exports.authenticate = expressJwt({
    secret: 'my-secret',
    requestProperty: 'auth',
    getToken: function(req) {
        if (req.headers['x-auth-token']) {
            return req.headers['x-auth-token'];
        }
        return null;
    }
});

exports.getCurrentUser = function(req, res, next) {
    User.findById(req.auth.id, function(err, user) {
        if (err) {
            next(err);
        } else {
            req.user = user;
            next();
        }
    });
};

exports.getOne = function(req, res) {
    var user = req.user.toObject();

    delete user['twitterProvider'];
    delete user['__v'];

    res.json(user);
};