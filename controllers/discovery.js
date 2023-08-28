const mongoose = require('mongoose');

const discoverySource = new mongoose.Schema({
  originalDisco: {
    type: String,
    required: true,
  },
  otherDisco1: {
    type: String,
    required: true,
  },
  otherDisco2: {
    type: String,
    required: true,
  },
  otherDisco3: {
    type: String,
    required: true,
  },
});

const Discovery = mongoose.model('Discovery', discoverySource);

module.exports = Discovery;