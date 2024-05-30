const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const {
  createWorkout,
  getWorkouts,
  getWorkoutById,
  deleteWorkout,
  updateWorkout,
} = require('../controllers/workoutController');

// Create a new workout
router.post('/', auth, createWorkout);

// Get all workouts for the logged-in user
router.get('/', auth, getWorkouts);

// Get a specific workout by ID
router.get('/:id', auth, getWorkoutById);

// Delete a workout
router.delete('/:id', auth, deleteWorkout);

// Update a workout
router.put('/:id', auth, updateWorkout);

module.exports = router;