const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const foodSchema = new Schema({
    foodInterest: {
        type: Array,
    },
});

const Food = mongoose.model('Food', foodSchema);

module.exports = Food