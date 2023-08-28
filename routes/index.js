const express = require('express');
const router = express.Router();
const trackTrack = require('../controllers/tracks');

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

// Define the route for viewing all tracks
router.get('/viewTracks/all', trackTrack.displayAllTracks);

// Define the route for viewing all tracks
router.get('/viewTracks/all', trackTrack.displayAllTracks);

// Define the route for adding new tracks
const renderAddNewTrackPage = require('../controllers/tracks').renderAddNewTrackPage;
router.get('/addTrack', renderAddNewTrackPage);

module.exports = router;