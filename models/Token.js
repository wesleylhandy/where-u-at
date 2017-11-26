const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const TokenSchema = new Schema({
	token_type: String,
	access_token: String,
	expires_in: Number
});

module.exports = mongoose.model('Token', TokenSchema);