const Exercise = require('../models/Exercise');

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
    res.json(groupedExercises);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};