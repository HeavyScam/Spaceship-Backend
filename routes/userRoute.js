const userController = require('../controllers/userController');
const router = require('express').Router();

// Signup route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);


module.exports = router;



