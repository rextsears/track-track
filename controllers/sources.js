const mongoose = require('mongoose');

const streamSource = new mongoose.Schema({
  originalSource: {
    type: String,
    required: true,
  },
  otherSource1: {
    type: String,
    required: true,
  },
  otherSource2: {
    type: String,
    required: true,
  },
  otherSource3: {
    type: String,
    required: true,
  },
});

const Source = mongoose.model('Source', streamSource);

module.exports = Source;