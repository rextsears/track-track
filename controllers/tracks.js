// bring in our models
const express = require('express');
const router = express.Router();
const Tracks = require('../models/tracks');
const Source = require('../models/sourceSchema');
const Discovery = require('../models/discoverySchema');
const Link = require('../models/sourceLinkSchema');


// Define all of our controller functions
router.get('/:id', (req, res) => {
    const trackId = req.params.id;
  
    Tracks.findById(trackId)
      .populate('source')
      .populate('discovery')
      .populate('link')
      .exec((err, track) => {
        if (err) {
          // Handle error
          return res.status(500).json({ message: 'Error retrieving track.' });
        }
        // Render a view or send a JSON response using the populated track object
        res.render('viewTracks/track', { track });
      });
  });
  
  function displayAllTracks(req, res) {
    Tracks.find()
      .then(tracks => {
        res.render('viewTracks/all', { tracks });
      })
      .catch(error => {
        res.status(500).json({ message: error.message });
      });
  }

  function renderAddNewTrackPage(req, res) {
    Source.find().then(sources => {
      Discovery.find().then(discoveries => {
        Link.find().then(links => {
          res.render('viewTracks/addNew', {
            sources,
            discoveries,
            links,
          });
        });
      });
    }).catch(error => {
      res.status(500).json({ message: error.message });
    });
  }

module.exports = {
    router,
    displayAllTracks,
    renderAddNewTrackPage,
};
