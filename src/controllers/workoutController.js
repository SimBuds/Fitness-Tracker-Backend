const Workout = require('../models/Workout');

exports.createWorkout = async (req, res) => {
  const { exercises, notes } = req.body;
  try {
    const newWorkout = new Workout({
      user: req.user.id,
      exercises,
      notes,
    });
    const workout = await newWorkout.save();
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id }).populate('exercises.exercise').sort({ date: -1 });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};