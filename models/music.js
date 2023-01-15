const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artists: {
        type: String,
    },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music