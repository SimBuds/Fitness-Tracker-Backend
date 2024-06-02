const express = require('express');
const { body } = require('express-validator');
const { register, login, logout } = require('../controllers/userController');
const asyncHandler = require('express-async-handler');

const router = express.Router();

// Validation middleware
const validateRegister = [
  body('name').notEmpty().withMessage('Name is required'),
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long')
];

const validateLogin = [
  body('email').isEmail().withMessage('Please enter a valid email address'),
  body('password').notEmpty().withMessage('Password is required')
];

// Register route
router.post('/register', validateRegister, asyncHandler(register));

// Login route
router.post('/login', validateLogin, asyncHandler(login));

// Logout route
router.post('/logout', asyncHandler(logout));

module.exports = router;