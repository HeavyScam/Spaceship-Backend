const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
    },
    age: {
        type: Number,
    },
    instagram: {
        type: String,
    },
    gender: {
        type: String,
    },
    password: {
        type: String,
    },
});


const User = mongoose.model('User', userSchema);

module.exports = User