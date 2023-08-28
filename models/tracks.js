const mongoose = require('mongoose');
const Source = require('./sourceSchema');
const Discovery = require('./discoverySchema'); 

const trackTrack = new mongoose.Schema({
  Song: {
    type: String,
    required: true,
  },
  Artist: {
    type: String,
    required: true,
  },
  Album: {
    type: String,
    required: false,
  },
  DateAdded: {
    type: Date,
    required: true,
    default: () => new Date().setFullYear(new Date().getFullYear() + 1),
  },
  Favorite: {
    type: Boolean,
    required: true,
    default: false,
  },
  source: [streamSource],
  discovery: [discoverySource],
});

const Tracks = mongoose.model('Tracks', trackTrack);

module.exports = Tracks;