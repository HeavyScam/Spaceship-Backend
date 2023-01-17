require("dotenv").config();
const express = require('express');
const cors = require('cors');
const User = require('./models/user');
const Food = require("./models/food");
const Music = require("./models/music");
const userRoute = require('./routes/userRoute');

const app = express();

app.use(cors());
app.use(express.json());
const connectToMongo = require('./db/db');
connectToMongo();

app.get('/', (req, res) => {
    res.send('Hello World!')
}
)

app.use('/api/v1', userRoute);

app.post('/addfood', async (req, res) => {
    const { foodInterest } = req.body;
    console.log(foodInterest);
    try {

        const food = new Food({
            foodInterest
        });

        const savedFood = await food.save();
        res.status(200).send(savedFood);

    }
    catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}
)

app.post('/addmusic', async (req, res) => {
    const { artists } = req.body;
    console.log(artists);
    try {

        const music = new Music({
            artists
        });

        const savedMusic = await music.save();
        res.status(200).send(savedMusic);

    }
    catch (err) {
        console.log(err)
        res.status(400).send(err);
    }
}
)

app.get('/getallusers', async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).send(users);
    } catch (err) {
        res.status(400).send(err);
    }
}
)






const PORT = process.env.PORT || 5000;


app.listen(PORT, () => {
    console.log(`Server is running on port: ${PORT}`);
}
)
