const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('./../models/User');

passport.serializeUser(function(user, done) {
    // console.log('serializeUser');
    done(null, user.id);
});

passport.deserializeUser(function(id, done) {
    // console.log('deserializeUser');
    User.findById(id, function(err, user) {
        done(null, user);
    });
});

module.exports = function() {
    passport.use(new TwitterTokenStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        includeEmail: true
    }, function(token, tokenSecret, profile, done) {
        console.log(JSON.stringify(profile, null, 5));
        // update the user if s/he exists or add a new user
        User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
            return done(err, user);
        });
    }));
}