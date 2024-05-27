const express = require('express');
const router = express.Router();
const { createWorkout, getWorkouts } = require('../controllers/workoutController');
const auth = require('../middleware/auth');

// Create workout
router.post('/', auth, createWorkout);

// Get workouts
router.get('/', auth, getWorkouts);

module.exports = router;