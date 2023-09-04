const mongoose = require('mongoose');

// Schema for streaming sources
const streamingSourceSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true,
  },
});

const StreamingSource = mongoose.model('StreamingSource', streamingSourceSchema);

module.exports = StreamingSource;