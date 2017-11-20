const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    twitterId: {
        type: String,
        required: true
    },
    friends: [{ type: ObjectId, ref: 'User' }],
    favorites: [String]
});

module.exports = mongoose.model('User', UserSchema);