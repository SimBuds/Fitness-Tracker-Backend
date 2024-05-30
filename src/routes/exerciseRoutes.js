const express = require('express');
const router = express.Router();
const { getExercises, getExerciseById, createExercise } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

// Get exercises
router.get('/', auth, getExercises);

// Get a specific exercise by ID
router.get('/:id', getExerciseById);

// Create a new exercise
router.post('/', createExercise);

module.exports = router;