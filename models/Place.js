const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    place: {
        yelpId: {
            type: String,
            required: true,
            unique: true
        },
        name: {
            type: String,
            required: true
        },
        imageUrl: {
            type: String,
            required: true
        },
        url: {
            type: String,
            required: true
        },
        rating: {
            type: Number,
            required: true
        },
        address: {
            type: Schema.Types.Mixed,
            required: true
        }
    },
    going: [{
        searchDate: String,
        peep: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Place', PlaceSchema);