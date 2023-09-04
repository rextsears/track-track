const mongoose = require('mongoose');

// Schema for users
const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
});

module.exports = mongoose.model('User', userSchema);