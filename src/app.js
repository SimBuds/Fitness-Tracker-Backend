require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const exerciseRoutes = require('./routes/exerciseRoutes');
const workoutRoutes = require('./routes/workoutRoutes');
const errorHandler = require('./middleware/errorHandler');
const helmet = require('helmet');
const morgan = require('morgan');

// Initialize the app
const app = express();

// Connect to the database
connectDB();

// Middleware
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(morgan('tiny'));
app.use(errorHandler);

// Routes
app.use('/api/users', userRoutes);
app.use('/api/exercises', exerciseRoutes);
app.use('/api/workouts', workoutRoutes);

// Default route
app.get('/', (req, res) => {
  res.send('Workout Tracker API');
});

module.exports = app;