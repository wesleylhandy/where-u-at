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
    friends: [{ type: Schema.Types.ObjectId, ref: 'User' }],
    favorites: [{ type: Schema.Types.ObjectId, ref: 'Place' }]
});

module.exports = mongoose.model('User', UserSchema);