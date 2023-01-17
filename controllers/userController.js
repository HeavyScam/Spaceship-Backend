const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const Artist = require('../models/music');
const Food = require('../models/food');

const registerUser = async (req, res) => {
    const { name, userName, password, age, instagram, gender } = req.body;
    console.log(name, userName, age, instagram, gender, password);
    try {
        let user = await User.findOne({ userName: userName })
        console.log(user)
        if (user) {
            return res.status(401).json({
                message: "User already exists,please login",
                success: false
            })
        }
        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);
        user = await User.create({
            name,
            userName,
            age,
            instagram,
            gender,
            password: hashedPassword
        })
        const payload = {
            user: {
                id: user.id,
            }
        }

        // console.log(payload);
        const token = jwt.sign(payload, process.env.JWT_SECRET, {
            expiresIn:
                '20d'
        });
        res.status(200).json({
            message: 'User created successfully',
            success: true,
            token,
        });

    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
        // console.log(err);
    }
}

const loginUser = async (req, res) => {
    const { userName, password } = req.body;
    console.log(userName, password);
    try {
        let user = await User.findOne({ userName });
        if (!user) {
            return res.status(401).json({
                message: 'Invalid email or password, please try again',
                success: false,
            });
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: 'Invalid password, please try again!',
                success: false,
            });
        }
        const payload = {
            user: {
                id: user.id
            }
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '20d' });
        res.status(200).json({
            message: 'User logged in successfully',
            success: true,
            token,
            user: {
                id: user.id,
                name: user.name,
                userName: user.userName,
                age: user.age,
                instagram: user.instagram,
                gender: user.gender,
                password: user.password,
            }
        });
    }
    catch (err) {
        res.status(500).json({
            message: 'Error logging in user',
            success: false,
        });
        // console.log(err);
    }
}


// Route to let users choose preferences and save in database and in user model

const preferences = async (req, res) => {
    const { artist, foodInterest } = req.body;
    console.log(artist, foodInterest)
    try {
        const artistInfo = new Artist({
            artist,
        })
        const savedArtist = await artistInfo.save();
        console.log(savedArtist);
        // const movieInfo = new Movie({
        //     movie,
        // })
        // const savedMovie = await movieInfo.save();
        // console.log(savedMovie);
        const foodInfo = new Food({
            foodInterest,
        })
        const savedFood = await foodInfo.save();
        console.log(savedFood);
        // const travelInfo = new Travel({
        //     travel,
        // })
        // const savedTravel = await travelInfo.save();
        // console.log(savedTravel);
        res.status(200).json({
            message: 'Preferences saved successfully',
            success: true,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}


const getUserbyId = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await User.findOne({ _id: id });
        res.status(200).json({
            message: 'User found',
            success: true,
            user,
        });
    }
    catch (err) {
        res.status(500).json({
            message: err.message,
            success: false,
        });
    }
}


module.exports = { registerUser, loginUser, preferences, getUserbyId }