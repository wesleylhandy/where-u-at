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
        callbackURL: process.env.NODE_ENV === 'production' ? process.env.TWITTER_CALLBACK_URL : 'http://127.0.0.1:3000/'
    },
    function(token, tokenSecret, profile, done) {
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
        console.log(JSON.stringify(profile, null, 5));
        // update the user if s/he exists or add a new user
        User.findOneAndUpdate(searchQuery, updates, options, function(err, user) {
            if (err) {
                return done(err, null);
            } else {
                return done(null, user);
            }
        });
    }
));