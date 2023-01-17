const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const musicSchema = new Schema({
    artist: {
        type: String,
    },
});

const Music = mongoose.model('Music', musicSchema);

module.exports = Music