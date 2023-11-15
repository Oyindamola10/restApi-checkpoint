const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  // Add other fields as needed
});

// const User = mongoose.model('User', userSchema);

module.exports = mongoose.model('User', UserSchema);
