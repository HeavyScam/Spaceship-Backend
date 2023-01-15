const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    foodInterest: {
        type: String,
    },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food