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
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Exercise',
      required: true,
    },
  ],
  notes: {
    type: String,
    required: false,
  },
});

const Workout = mongoose.model('Workout', workoutSchema);

module.exports = Workout;