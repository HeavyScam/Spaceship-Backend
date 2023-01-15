const User = require('../models/user');

const registerUser = async (req, res) => {
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

module.exports = registerUser;