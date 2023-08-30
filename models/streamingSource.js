// models/streamingSource.js
const mongoose = require('mongoose');

const streamingSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const StreamingSource = mongoose.model('StreamingSource', streamingSourceSchema);

module.exports = StreamingSource;