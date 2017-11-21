const passport = require('passport');
const TwitterStrategy = require('passport-twitter').Strategy;
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

passport.use(new TwitterStrategy({
        consumerKey: process.env.TWITTER_CONSUMER_KEY,
        consumerSecret: process.env.TWITTER_CONSUMER_SECRET,
        callbackURL: process.env.TWITTER_CALLBACK_URL || 'http://localhost:3001/auth/twitter/callback'
    },
    function(accessToken, refreshToken, profile, done) {
        var searchQuery = {
            name: profile.displayName
        };
        var updates = {
            name: profile.displayName,
            twitterId: profile.id
        };
        var options = {
            upsert: true
        };
        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
            if (err) {
                return done(err);
            } else {
                return done(null, user);
            }
        });
    }
));