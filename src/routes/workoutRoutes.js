const express = require('express');
const { body } = require('express-validator');
const { createWorkout, getWorkouts, getWorkoutById, deleteWorkout, updateWorkout } = require('../controllers/workoutController');
const asyncHandler = require('express-async-handler');
const auth = require('../middleware/auth');

const router = express.Router();

// Validation middleware
const validateWorkout = [
  body('exercises').isArray().withMessage('Exercises must be an array'),
  body('exercises.*.exercise').notEmpty().withMessage('Exercise ID is required'),
  body('exercises.*.sets').isInt({ min: 1 }).withMessage('Sets must be a positive integer'),
  body('exercises.*.reps').isInt({ min: 1 }).withMessage('Reps must be a positive integer'),
  body('date').optional().isISO8601().toDate().withMessage('Invalid date format'),
  body('notes').optional().isString().withMessage('Notes must be a string')
];

// Get all workouts for the logged-in user
router.get('/', auth, asyncHandler(getWorkouts));

// Get a specific workout by ID
router.get('/:id', auth, asyncHandler(getWorkoutById));

// Create a new workout
router.post('/', auth, validateWorkout, asyncHandler(createWorkout));

// Update a workout
router.put('/:id', auth, validateWorkout, asyncHandler(updateWorkout));

// Delete a workout
router.delete('/:id', auth, asyncHandler(deleteWorkout));

module.exports = router;