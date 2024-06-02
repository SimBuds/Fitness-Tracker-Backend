const express = require('express');
const { body } = require('express-validator');
const { getExercises, getExerciseById, createExercise } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');
const router = express.Router();

const validateExercise = [
  body('name').notEmpty().withMessage('Name is required'),
  body('workout_type').notEmpty().withMessage('Workout type is required'),
  body('description').optional().isString().withMessage('Description must be a string'),
  body('steps').optional().isArray().withMessage('Steps must be an array of strings'),
  body('image').optional().isString().withMessage('Image must be a string'),
  body('video').optional().isString().withMessage('Video must be a string')
];

// Get exercises
router.get('/', auth, getExercises);

// Get a specific exercise by ID
router.get('/:id', auth, getExerciseById);

// Create a new exercise
router.post('/', auth, validateExercise, createExercise);

module.exports = router;