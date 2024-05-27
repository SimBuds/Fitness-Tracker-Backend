const mongoose = require('mongoose');
const Exercise = require('../models/Exercise');
const connectDB = require('./db');

const exercises = [
  {
    name: 'Push-Up',
    workout_type: 'Chest',
    description: 'A basic upper body exercise.',
    image: '',
  },
  {
    name: 'Squat',
    workout_type: 'Legs',
    description: 'A basic lower body exercise.',
    image: '',
  },
];

const populateExercises = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercise data populated successfully');
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

populateExercises();