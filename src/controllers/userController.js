const User = require('../models/User');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');

// Register a new user
exports.register = async (req, res, next) => {
  const { name, email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({ name, email, password });
    await user.save();

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) return next(err);
      res.status(201).json({ token });
    });
  } catch (err) {
    next(err);
  }
};

// Login a user
exports.login = async (req, res, next) => {
  const { email, password } = req.body;

  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid credentials' });
    }

    const payload = { user: { id: user.id } };
    jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '24h' }, (err, token) => {
      if (err) return next(err);
      res.status(200).json({ token });
    });
  } catch (err) {
    next(err);
  }
};

// Logout a user
exports.logout = (req, res, next) => {
  try {
    res.status(200).json({ msg: 'User logged out' });
  } catch (err) {
    next(err);
  }
};