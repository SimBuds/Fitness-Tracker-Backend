const express = require('express');
const router = express.Router();
const { getExercises } = require('../controllers/exerciseController');
const auth = require('../middleware/auth');

// Get exercises
router.get('/', auth, getExercises);

module.exports = router;