const Workout = require('../models/Workout');

// Get all workouts for the logged-in user
exports.getWorkouts = async (req, res) => {
  try {
    const workouts = await Workout.find({ user: req.user.id })
      .populate('exercises.exercise')
      .sort({ date: -1 });
    res.status(200).json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Get a specific workout by ID
exports.getWorkoutById = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id).populate('exercises.exercise');
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(200).json(workout);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server error');
  }
};

// Create a new workout
exports.createWorkout = async (req, res) => {
  const { exercises, notes } = req.body;

  // Input validation
  if (!exercises || exercises.length === 0) {
    return res.status(400).json({ msg: 'Exercises are required' });
  }

  try {
    const newWorkout = new Workout({
      user: req.user.id,
      exercises,
      notes,
    });
    const workout = await newWorkout.save();
    res.status(201).json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a workout
exports.updateWorkout = async (req, res) => {
  const { exercises, notes } = req.body;

  // Input validation
  if (!exercises || exercises.length === 0) {
    return res.status(400).json({ msg: 'Exercises are required' });
  }

  try {
    let workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    workout.exercises = exercises;
    workout.notes = notes || workout.notes;
    workout.date = Date.now();

    workout = await workout.save();
    res.status(200).json(workout);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server error');
  }
};

// Delete a workout
exports.deleteWorkout = async (req, res) => {
  try {
    const workout = await Workout.findById(req.params.id);
    if (!workout) {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    if (workout.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }
    await Workout.deleteOne({ _id: req.params.id });
    res.status(200).json({ msg: 'Workout removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Workout not found' });
    }
    res.status(500).send('Server error');
  }
};