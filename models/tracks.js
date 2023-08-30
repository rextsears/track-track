const mongoose = require('mongoose');
const streamSource = require('./sourceSchema');
const discoverySource = require('./discoverySchema');


const trackTrack = new mongoose.Schema({
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
    required: false,
  }],
  discovery: [{
    type: String,
    required: false,
  }],
  link: {
    type: String,
    required: false,
  },
});

const Tracks = mongoose.model('Tracks', trackTrack);

module.exports = Tracks;