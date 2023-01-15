const mongoose = require('mongoose');

const connectToMongo = () => {
    // console.log(process.env.MONGODB_URI);
    mongoose.connect(process.env.DB_URI, async () => {
        console.log(process.env.DB_URI);
        await console.log('Connected to MongoDB');
    });

}

module.exports = connectToMongo;