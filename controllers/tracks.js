const Tracks = require('../models/tracks');

// Controller function to display all tracks and render on the "All Tracks" page
async function displayAllTracks(req, res) {
  try {
    const allTracks = await Tracks.find();
    res.render('trackView/all', { tracks: allTracks });
  } catch (error) {
    res.render('error', { message: 'Error displaying all tracks', error });
  }
}

// Controller function to render the "Add New Track" page
function renderAddNewTrackPage(req, res) {
  res.render('add/addTrack');
}

// Controller function to handle the submission of a new track from the "Add New Track" page to the database
async function addNewTrack(req, res) {
    const { song, artist, album, dateAdded, source, discovery, link } = req.body;
    const favorite = req.body.favorite === 'on'; // Convert to boolean
    try {
      const newTrack = new Tracks({
        song,
        artist,
        album,
        dateAdded,
        favorite,
        source,
        discovery,
        link,
      });
      await newTrack.save();
      res.redirect('/'); // Redirect to home page or a relevant route
    } catch (error) {
      res.render('error', { message: 'Error adding new track', error });
    }
  }

// Controller function to render the "Edit Track" page
async function renderEditTrackPage(req, res) {
  const trackId = req.params.id;
  try {
    const track = await Tracks.findById(trackId);
    res.render('add/editTrack', { track });
  } catch (error) {
    res.render('error', { message: 'Error rendering edit page', error });
  }
}

// Controller function to handle the submission of an edited track from the "Edit Track" page to the database
async function editTrack(req, res) {
  const trackId = req.params.id;
  const updatedTrackData = req.body;
  try {
    await Tracks.findByIdAndUpdate(trackId, updatedTrackData);
    res.redirect('/'); // Redirect to home page or a relevant route
  } catch (error) {
    res.render('error', { message: 'Error editing track', error });
  }
}

// Controller function to delete a track
async function deleteTrack(req, res) {
  const trackId = req.params.id;
  try {
    await Tracks.findByIdAndDelete(trackId);
    res.redirect('/'); // Redirect to home page or a relevant route
  } catch (error) {
    res.render('error', { message: 'Error deleting track', error });
  }
}

// Controller function to display all tracks alphabetically by Song and render on the "All Tracks by Song A-Z" page
async function displaySong(req, res) {
    try {
      const tracksBySong = await Tracks.find().sort({ song: 1 });
      res.render('trackView/byAlpha', { tracks: tracksBySong, title: 'All Tracks by Song A-Z' });
    } catch (error) {
      res.render('error', { message: 'Error displaying tracks by song', error });
    }
  }
  
  // Controller function to display all tracks by Date Added and render on the "All Tracks by Date Added" page
  async function displayDate(req, res) {
    try {
      const tracksByDate = await Tracks.find().sort({ dateAdded: 1 });
      res.render('trackView/byDate', { tracks: tracksByDate, title: 'All Tracks by Date Added' });
    } catch (error) {
      res.render('error', { message: 'Error displaying tracks by date', error });
    }
  }
  
  // Controller function to display all tracks alphabetically by Artist and render on the "All Tracks by Artist" page
  async function displayArtist(req, res) {
    try {
      const tracksByArtist = await Tracks.find().sort({ artist: 1 });
      res.render('trackView/byArtist', { tracks: tracksByArtist, title: 'All Tracks by Artist' });
    } catch (error) {
      res.render('error', { message: 'Error displaying tracks by artist', error });
    }
  }
  
  // Controller function to display all tracks by Streaming Source and render on the "All Tracks by Streaming Source" page
  async function displaySource(req, res) {
    try {
      const tracksBySource = await Tracks.find().sort({ source: 1 });
      res.render('trackView/byStreamSource', { tracks: tracksBySource, title: 'All Tracks by Streaming Source' });
    } catch (error) {
      res.render('error', { message: 'Error displaying tracks by streaming source', error });
    }
  }
  
  // Controller function to display all tracks by Discovery Source and render on the "All Tracks by Discovery Source" page
  async function displayDisco(req, res) {
    try {
      const tracksByDiscovery = await Tracks.find().sort({ discovery: 1 });
      res.render('trackView/byDiscoSource', { tracks: tracksByDiscovery, title: 'All Tracks by Discovery Source' });
    } catch (error) {
      res.render('error', { message: 'Error displaying tracks by discovery source', error });
    }
  }
  
  module.exports = {
    displayAllTracks,
    renderAddNewTrackPage,
    addNewTrack,
    renderEditTrackPage,
    editTrack,
    deleteTrack,
    displaySong,
    displayDate,
    displayArtist,
    displaySource,
    displayDisco,
  };