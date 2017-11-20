const router = require('express').Router();
const passport = require('passport');
const middleware = require('./../config/middleware');
const User = require('../models/User');

module.exports = function(app) {
    app.use('/api', router);
}