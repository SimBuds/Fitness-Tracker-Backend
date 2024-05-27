const Exercise = require('../models/Exercise');

exports.createExercise = async (req, res) => {
  const { name, workout_type, sets, reps, description } = req.body;
  const image = req.file ? req.file.path : null;
  try {
    const newExercise = new Exercise({
      name,
      workout_type,
      sets,
      reps,
      description,
      image,
    });
    const exercise = await newExercise.save();
    res.json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getExercises = async (req, res) => {
  try {
    const exercises = await Exercise.find();
    res.json(exercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};