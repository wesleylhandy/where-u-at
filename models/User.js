const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        match: /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/
    },
    id: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    twitterProvider: {
        type: {
            id: String,
            token: String
        },
        select: false
    },
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
});

UserSchema.statics.upsertTwitterUser = function(token, tokenSecret, profile, cb) {
    var that = this;
    return this.findOne({
        'twitterProvider.id': profile.id
    }, function(err, user) {
        // no user was found, lets create a new one
        console.log({profile: profile})
        if (!user) {
            var newUser = new that({
                name: profile.username,
                email: profile.emails[0].value,
                id: profile.id,
                imageUrl: profile.profile_image_url_https || 'https://via.placeholder.com/75',
                twitterProvider: {
                    id: profile.id,
                    token: token,
                    tokenSecret: tokenSecret
                }
            });

            newUser.save(function(error, savedUser) {
                if (error) {
                    console.error({newUserUpsertError: error});
                }
                return cb(error, savedUser);
            });
        } else {

            return cb(err, user);
        }
    });
};

module.exports = mongoose.model('User', UserSchema);