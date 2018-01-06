const passport = require('passport');
const TwitterTokenStrategy = require('passport-twitter-token');
const User = require('./../models/User');

passport.serializeUser(function(user, done) {
    // console.log('serializeUser');
    done(null, user);
});

passport.deserializeUser(function(user, done) {
    // console.log('deserializeUser');
    User.findById(user._id, function(err, user) {
        if(err){console.error({deserializeError: err})}
        done(null, user);
    });
});

module.exports = function() {
    passport.use(new TwitterTokenStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        includeEmail: true
    }, function(token, tokenSecret, profile, done) {
        // update the user if s/he exists or add a new user
        User.upsertTwitterUser(token, tokenSecret, profile, function(err, user) {
            if(err)console.error({upsertError: err})
            return done(err, user);
        });
    }));
}