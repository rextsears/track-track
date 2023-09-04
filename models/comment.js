const mongoose = require('mongoose');

// Schema for user comments/ratings
const commentSchema = new mongoose.Schema({
  user: {
    type: String,
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
    validate: {
      validator: Number.isInteger,
      message: 'Rating must be a whole number from 1-5. {VALUE} is not a valid whole number for rating.',
    },
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);