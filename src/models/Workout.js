const mongoose = require('mongoose');

const workoutSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  exercises: [
    {
      exercise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Exercise',
        required: true,
      },
      sets: {
        type: Number,
        required: true,
        min: [1, 'Sets must be at least 1'],
      },
      reps: {
        type: Number,
        required: true,
        min: [1, 'Reps must be at least 1'],
      },
    },
  ],
  notes: {
    type: String,
    required: false,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;