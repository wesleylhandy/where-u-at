const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    place: {
        yelpId: {
            type: String,
            required: true,
            unique: true
        },
        name: String,
        imageUrl: String,
        url: String,
        rating: Number,
        address: Schema.Types.Mixed
    },
    going: [{
        searchDate: Date,
        peep: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Place', PlaceSchema);