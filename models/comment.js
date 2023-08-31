const mongoose = require('mongoose');

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
      message: '{VALUE} is not an integer value for rating.',
    },
  },
  text: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model('Comment', commentSchema);