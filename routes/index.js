const express = require('express');
const router = express.Router();
const trackController = require('../controllers/tracks');
const streamingSourceController = require('../controllers/streamingSource');
const commentController = require('../controllers/comment');

/* GET home page. */
router.get('/', function(req, res) {
  res.render('index', { title: 'Track-Track' });
});

// Route for viewing all tracks
router.get('/trackView/all', trackController.displayAllTracks);

// Route for displaying the add new track form
router.get('/add/addTrack', trackController.renderAddNewTrackPage);

// Route for handling the form submission for creating a new track in the database
router.post('/add/addTrack', trackController.addNewTrack);

// Routes for checking permissions to edit or delete tracks
router.post('/add/editTrack/:id', trackController.checkTrackOwnership, trackController.editTrack);
router.post('/tracks/delete/:id', trackController.checkTrackOwnership, trackController.deleteTrack);

// Routes for rendering the "Edit Track" page
router.get('/add/editTrack/:id', trackController.renderEditTrackPageWithSources);
router.get('/add/editTrack/:id', trackController.renderEditTrackPage);

// Route for handling the submission of an edited track from the "Edit Track" page to the database
router.post('/add/editTrack/:id', trackController.editTrack);

// Route for deleting a track from the database
router.post('/tracks/delete/:id', trackController.deleteTrack);

// Route for display of all tracks alphabetically by Song and render on the "All Tracks by Song A-Z" page
router.get('/trackView/bySong', trackController.displaySong);

// Route for display of all tracks by Date Added and render on the "All Tracks by Date Added" page
router.get('/trackView/byDate', trackController.displayDate);

// Route for display of all tracks alphabetically by Artist and render on the "All Tracks by Artist" page
router.get('/trackView/byArtist', trackController.displayArtist);

// Route for display of all tracks by Streaming Source and render on the "All Tracks by Streaming Source" page
router.get('/trackView/byStreamSource', trackController.displaySource);

// Route for display of all tracks by Discovery Source and render on the "All Tracks by Discovery Source" page
router.get('/trackView/byDiscoSource', trackController.displayDisco);

// Route for displaying the detail of an individual track
router.get('/trackView/track/:id', trackController.displayTrackDetail);

// Route for viewing the add streaming source form
router.get('/add/addStreamingSource', streamingSourceController.renderAddStreamingSourcePage);

// Route for handling the form submission for adding a new streaming source
router.post('/streamingSource/add', streamingSourceController.addStreamingSource);

// Route for viewing all streaming sources
router.get('/streamingSourceView', streamingSourceController.displayAllStreamingSources);

// Routes for rendering the "Edit Streaming Source" page
router.get('/streamingSource/edit/:id', streamingSourceController.renderEditStreamingSourcePage);
router.get('/add/addStreamingSource', streamingSourceController.renderAddStreamingSourcePage);

// Route for handling the submission of an edited streaming source
router.post('/streamingSource/edit/:id', streamingSourceController.editStreamingSource);

// Route for deleting a streaming source
router.post('/streamingSource/delete/:id', streamingSourceController.deleteStreamingSource);

// Route for user logout
router.get('/auth/logout', (req, res) => {
  req.logout(() => {
    res.redirect('/');
  });
});

// Route for displaying tracks added by the logged-in user
router.get('/trackView/userTracks', trackController.displayUserTracks);

// Route for adding a comment to a track
router.post('/trackView/track/:trackId/comment/add', commentController.addComment);

// Routes for checking permissions to edit or delete comments
router.get('/trackView/track/:trackId/comment/:commentId/edit', commentController.renderEditCommentPage);
router.post('/trackView/track/:trackId/comment/:commentId/edit', commentController.checkCommentOwnership, commentController.editComment);
router.get('/trackView/track/:trackId/comment/:commentId/delete', commentController.checkCommentOwnership, commentController.deleteComment);

// Route to render the edit comment page
router.get('/trackView/track/:trackId/comment/:commentId/edit', commentController.renderEditCommentPage);

// Route to update the edited comment
router.post('/trackView/track/:trackId/comment/:commentId/edit', commentController.editComment);

// Route for deleting a comment
router.get('/trackView/track/:trackId/comment/:commentId/delete', commentController.deleteComment);

module.exports = router;