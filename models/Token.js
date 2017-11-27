const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
    token_type: String,
    access_token: String,
    expires_in: Number,
    expires_on: Date
});

TokenSchema.pre('save', function(next) {
    const token = this;

    token.expires_on = new Date(Date.now() + token.expires_in * 1000);
    next();
});

module.exports = mongoose.model('Token', TokenSchema);