const User = require('../models/user');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

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


module.exports = { registerUser, loginUser }