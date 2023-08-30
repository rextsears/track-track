const express = require('express');
const router = express.Router();
const trackTrackController = require('../controllers/tracks');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Define the route for viewing all tracks
router.get('/viewTracks/all', trackTrackController.displayAllTracks);

// Route for displaying the add new track form
router.get('/tracks/addNew', trackTrackController.renderAddNewTrackPage);

// Route for handling the form submission for creating a new track
router.post('/tracks/addNew', trackTrackController.addNewTrack);

module.exports = router;