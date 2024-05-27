const express = require('express');
const router = express.Router();
const { createExercise, getExercises } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');
const upload = require('../middleware/upload');

// Create exercise
router.post('/', auth, upload.single('image'), createExercise);

// Get exercises
router.get('/', auth, getExercises);

module.exports = router;