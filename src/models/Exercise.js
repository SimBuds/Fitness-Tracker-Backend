const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  workout_type: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: false,
  },
  steps: {
    type: [String],
    required: false,
  },
  image: {
    type: String,
    required: false,
  },
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;