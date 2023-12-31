const mongoose = require('mongoose');
const Comment = require('./comment');

// Schema for main Track-Track music database
const trackTrack = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  song: {
    type: String,
    required: true,
  },
  artist: {
    type: String,
    required: true,
  },
  album: {
    type: String,
    required: false,
  },
  dateAdded: {
    type: Date,
    required: true,
    default: () => new Date().setFullYear(new Date().getFullYear() + 1),
  },
  favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  source: [{
    type: String,
    required: true,
  }],
  discovery: [{
    type: String,
    required: false,
  }],
  link: {
    type: String,
    required: false,
  },
  comments: [Comment.schema],
});

const Tracks = mongoose.model('Tracks', trackTrack);

module.exports = Tracks;