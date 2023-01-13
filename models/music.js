const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artists: {
        type: Array,
    },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music