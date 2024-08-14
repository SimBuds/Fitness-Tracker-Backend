require('dotenv').config();
const Exercise = require('../models/Exercise');
const connectDB = require('./db');

// Bootstrap exercise data
const exercises = [
  {
    name: 'Hip Abduction Machine',
    workout_type: 'Abductors',
    description: 'The hip abduction machine exercise is an exercise used to strengthen the abductors. The abductors play a critical role in core stability and having strong abductors can result in better personal records on the squat and deadlift. From an aesthetic perspective, performing hip abduction isolation exercises assists in the development of a full pair of glutes and hips.',
    steps: [
      'Setup in an upright position with your back against the pad and your spine neutral.',
      'Exhale and push the legs apart as you open the pads.',
      'Once your hips are fully externally rotated, slowly return to the starting position.',
      'Repeat for the desired number of repetitions.'
    ],
    image: 'https://cdn.muscleandstrength.com/sites/all/themes/mnsnew/images/taxonomy/exercises/muscle-groups/full/Abductors.jpg',
    video: 'https://www.youtube.com/watch?v=7pbZA7ncuq8'
  },
];

// Function to populate the exercises collection
const populateExercises = async () => {
  try {
    await connectDB();
    await Exercise.deleteMany({});
    await Exercise.insertMany(exercises);
    console.log('Exercise data populated successfully');
    process.exit();
  } catch (err) {
    console.error('Failed to populate exercise data:', err);
    process.exit(1);
  }
};

// Execute the function
populateExercises();