const mongoose = require('mongoose');

const sourceLink = new mongoose.Schema({
  trackLink: {
    type: String,
    required: true,
  },
});

const Link = mongoose.model('Link', sourceLink);

module.exports = Link;