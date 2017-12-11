const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PlaceSchema = new Schema({
    data: Schema.Types.Mixed,
    going: [{
        searchDate: Date,
        peep: { type: Schema.Types.ObjectId, ref: 'User' }
    }]
});

module.exports = mongoose.model('Place', PlaceSchema);