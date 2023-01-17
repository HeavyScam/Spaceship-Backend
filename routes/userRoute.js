const userController = require('../controllers/userController');
const router = require('express').Router();

// Signup route
router.post('/register', userController.registerUser);

// Login route
router.post('/login', userController.loginUser);

router.post('/addpreference', userController.preferences);

router.get('/getuser/:id', userController.getUserbyId);


module.exports = router;



