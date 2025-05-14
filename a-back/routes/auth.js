const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const passport = require('passport');
const User = require('../model/User');

// Register
router.post('/register', async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ msg: 'User exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new User({ name, email, password: hashedPassword });
    await newUser.save();
    res.status(201).json({ msg: 'User registered' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: 'Server error' });
  }
});


// Login
router.post('/login', passport.authenticate('local'), (req, res) => {
  console.log(req.body);
  
  res.json({ msg: 'Logged in', user: req.user });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout(() => {
    res.json({ msg: 'Logged out' });
  });
});

router.get('/check', (req, res) => {
  if (req.isAuthenticated()) {
    res.json({ user: req.user });
  } else {
    res.status(401).json({ msg: 'Not logged in' });
  }
});

module.exports = router;
