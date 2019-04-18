const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AttractionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    coordinates: {
        lat: Number,
        lon: Number
    }
}, {
    timestamps: true
});

AttractionSchema.statics.getAttraction = function ({
    amount = 0,
    filter = {}
}) {

    const query = {
        ...filter
    };

    return new Promise((resolve, reject) => {
        this.find(query, {}, {
            limit: amount
        }, (err, attractions) => {
            if (err) return reject(err);
            attractions = attractions || [];

            resolve(amount == 1 ? attractions[0] : attractions);
        });
    });
};

const Attraction = mongoose.model('Attraction', AttractionSchema);

module.exports = Attraction;