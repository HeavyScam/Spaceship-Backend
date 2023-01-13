require("dotenv").config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const User = require('./models/user');


const app = express();

app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello World!')
}
)

app.post('/register', async (req, res) => {
    const { name, age, instagram, gender, password } = req.body;
    console.log(name, age, instagram, gender, password);
    try {
        const user = await User.findOne({ instagram: instagram })
        console.log(user)
        if (user) return res.status(400).send('User already exists');
        else {
            const newUser = new User({
                name,
                age,
                instagram,
                gender,
                password
            });

            const savedUser = await newUser.save();
            res.status(200).send(savedUser);

        }
    } catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}
)





const PORT = process.env.PORT || 5000;


mongoose.connect(process.env.DB_URI, { useNewUrlParser: true, useUnifiedTopology: true }, (err) => {
    if (err) throw err;
    console.log('MongoDB connection established');
}
)

app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}
)
