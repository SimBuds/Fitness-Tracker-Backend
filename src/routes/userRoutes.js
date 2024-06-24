const express = require('express');
const { body } = require('express-validator');
const { register, login, logout, updateProfile } = require('../controllers/userController');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

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

const validateUpdateProfile = [
  body('age').optional().isNumeric().withMessage('Age must be a number'),
  body('sex').optional().isIn(['Male', 'Female', 'Other']).withMessage('Invalid sex value'),
  body('weight').optional().isNumeric().withMessage('Weight must be a number'),
  body('height').optional().isNumeric().withMessage('Height must be a number')
];

// Register route
router.post('/register', validateRegister, asyncHandler(register));

// Login route
router.post('/login', validateLogin, asyncHandler(login));

// Logout route
router.post('/logout', asyncHandler(logout));

// Update profile route
router.put('/profile', auth, validateUpdateProfile, asyncHandler(updateProfile));

module.exports = router;