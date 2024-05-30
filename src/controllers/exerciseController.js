const Exercise = require('../models/Exercise');

// Get all exercises, grouped by workout_type
exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    const groupedExercises = exercises.reduce((acc, exercise) => {
      const { workout_type } = exercise;
      if (!acc[workout_type]) {
        acc[workout_type] = [];
      }
      acc[workout_type].push(exercise);
      return acc;
    }, {});
    res.status(200).json(groupedExercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific exercise by ID
exports.getExerciseById = async (req, res) => {
  try {
    const exercise = await Exercise.findById(req.params.id);
    if (!exercise) {
      return res.status(404).json({ msg: 'Exercise not found' });
    }
    res.status(200).json(exercise);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Exercise not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create a new exercise
exports.createExercise = async (req, res) => {
  const { name, workout_type, description, steps, image, video } = req.body;

  // Input validation
  if (!name || !workout_type) {
    return res.status(400).json({ msg: 'Name and workout type are required' });
  }

  try {
    const newExercise = new Exercise({
      name,
      workout_type,
      description,
      steps,
      image,
      video,
    });

    const exercise = await newExercise.save();
    res.status(201).json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};