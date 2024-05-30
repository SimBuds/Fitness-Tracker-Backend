const express = require('express');
const router = express.Router();
const { register, login, logout } = require('../controllers/userController');

// Register route
router.post('/register', register);

// Login route
router.post('/login', login);

// Logout a user
router.post('/logout', logout);

module.exports = router;