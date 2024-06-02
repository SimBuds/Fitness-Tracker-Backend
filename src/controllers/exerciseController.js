const Exercise = require('../models/Exercise');

// Get all exercises, grouped by workout_type
exports.getExercises = async (req, res, next) => {
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
    next(err);
  }
};

// Get a specific exercise by ID
exports.getExerciseById = async (req, res, next) => {
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
    next(err);
  }
};

// Create a new exercise
exports.createExercise = async (req, res, next) => {
  const { name, workout_type, description, steps, image, video } = req.body;

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
    next(err);
  }
};