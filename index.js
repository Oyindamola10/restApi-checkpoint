const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/User')
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3031;

// // Middleware
// app.use(express.json());

// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, { useNewUrlParser: true})
  .then(() => console.log('MongoDB connected'))
  .catch((err) => console.error('MongoDB connection error', err));

  // Middleware
app.use(express.json());

// Routes (Assuming you have a "models" folder and a "User.js" file)

// GET: Return all users
app.get('/users', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// POST: Add a new user to the database
app.post('/users', async (req, res) => {
  try {
    const newUser = new User(req.body);
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// PUT: Edit a user by ID
app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// DELETE: Remove a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    const deletedUser = await User.findByIdAndRemove(req.params.id);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

// Start Server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
