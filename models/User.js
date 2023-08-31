const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  googleId: String,
  username: String,
});

module.exports = mongoose.model('User', userSchema);