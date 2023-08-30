const Tracks = require('../models/tracks');
const Source = require('../models/sourceSchema');
const Discovery = require('../models/discoverySchema');

// Controller function to display a specific track by ID
function displayTrackById(req, res) {
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
}

// Controller function to display all tracks
function displayAllTracks(req, res) {
  Tracks.find()
    .then(tracks => {
      res.render('viewTracks/all', { tracks });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

// Controller function to render the "Add New Track" page
function renderAddNewTrackPage(req, res) {
  Source.find()
    .then(sources => {
      Discovery.find().then(discoveries => {
        res.render('tracks/addNew', {
          sources,
          discoveries,
        });
      });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

// Controller function to handle the submission of a new track
function addNewTrack(req, res) {

  // Create a new Tracks instance with the submitted data
  const newTrack = new Tracks(req.body);

  // Save the new track to the database
  newTrack.save()
    .then(() => {
      res.redirect('/viewTracks/all'); // Redirect to view all tracks
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

module.exports = {
  displayTrackById,
  displayAllTracks,
  renderAddNewTrackPage,
  addNewTrack,
};
