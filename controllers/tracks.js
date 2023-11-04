const Tracks = require('../models/tracks');
const StreamingSource = require('../models/streamingSource');
const User = require('../models/User');
const youtubeController = require('./youtube');
const moment = require('moment');

// Controller function to display all tracks and render on the "All Tracks" page
async function displayAllTracks(req, res) {
  try {
    const allTracks = await Tracks.find().populate('user'); // Populate the 'user' field
    res.render('trackView/all', { tracks: allTracks });
  } catch (error) {
    res.render('error', { message: 'Error displaying all tracks', error });
  }
}

// Controller function to render the "Add New Track" page
async function renderAddNewTrackPage(req, res) {
  try {
    const streamingSources = await StreamingSource.find();
    res.render('add/addTrack', { streamingSources });
  } catch (error) {
    res.render('error', { message: 'Error fetching streaming sources', error });
  }
}

// Controller function to handle the submission of a new track from the "Add New Track" page to the database
async function addNewTrack(req, res) {
  const { song, artist, album, dateAdded, favorite, source, discovery, link } = req.body;
  console.log('Request Body:', req.body);

  // Convert the "favorite" value to a boolean for the slider input
  const isFavorite = favorite === 'true';
  console.log('Favorite:', favorite);

  try {
    const newTrack = new Tracks({
      song,
      artist,
      album,
      dateAdded,
      favorite: isFavorite,
      source: [source],
      discovery,
      link,
      user: req.user._id,
    });
    await newTrack.save();
    res.redirect('/');
  } catch (error) {
    res.render('error', { message: 'Error adding new track', error });
  }
}

// Controller function to check if the user is authorized to edit or delete a track
async function checkTrackOwnership(req, res, next) {
  const trackId = req.params.id;
  
  try {
    const track = await Tracks.findById(trackId);
    
    if (!track) {
      console.log('Track not found');
      throw new Error('Track not found');
    }
    
    if (track.user.toString() !== req.user._id.toString()) {
      console.log('Unauthorized');
      throw new Error('Unauthorized');
    }
    
    next();
  } catch (error) {
    console.log('Error:', error);
    res.render('error', { message: 'Unauthorized', error });
  }
}

// Controller function to render the "Edit Track" page
async function renderEditTrackPage(req, res) {
  const trackId = req.params.id;
  try {
    const track = await Tracks.findById(trackId);
    const streamingSources = await StreamingSource.find();
    res.render('add/editTrack', { track, streamingSources });
  } catch (error) {
    res.render('error', { message: 'Error rendering edit track page', error });
  }
}

// Controller function to handle the submission of an edited track from the "Edit Track" page to the database
async function editTrack(req, res) {
  const trackId = req.params.id;
  const updatedTrackData = req.body;
  console.log('Request Body:', req.body);

  // Convert the "favorite" value to a boolean
  //updatedTrackData.favorite = updatedTrackData.favorite === 'true';

  try {
    await Tracks.findByIdAndUpdate(trackId, { ...updatedTrackData, user: req.user._id });
    const allTracks = await Tracks.find();
    res.redirect('/trackView/all'); // Redirect to the track list page after editing
  } catch (error) {
    res.render('error', { message: 'Error editing track', error });
  }
}

// Controller function to delete a track
async function deleteTrack(req, res) {
  const trackId = req.params.id;
  try {
    const track = await Tracks.findById(trackId);

    if (!track) {
      console.log('Track not found');
      throw new Error('Track not found');
    }

    // Check track ownership again (just to be safe)
    if (track.user.toString() !== req.user._id.toString()) {
      console.log('Unauthorized');
      throw new Error('Unauthorized');
    }

    await Tracks.findByIdAndDelete(trackId);
    
    // Render a specific page after deletion (e.g., track listing page)
    const allTracks = await Tracks.find();
    res.render('trackView/all', { tracks: allTracks });
  } catch (error) {
    console.log('Error:', error);
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

  // Controller function to display the detail of an individual track including YouTube player if applicable
  async function displayTrackDetail(req, res) {
    const trackId = req.params.id;
    try {
      const track = await Tracks.findById(trackId).populate('user');
      if (!track) {
        throw new Error('Track not found');
      }
  
      let youtubeVideoId = null;
      if (track.source.includes('YouTube') && track.link.includes('youtube.com/watch')) {
        const urlParams = new URLSearchParams(new URL(track.link).search);
        youtubeVideoId = urlParams.get('v');
      }
  
      res.render('trackView/trackDetail', { track, youtubeVideoId });
    } catch (error) {
      res.render('error', { message: 'Error displaying track detail', error });
    }
  }

// Controller function to render editTrack.ejs page
async function renderEditTrackPageWithSources(req, res) {
  const trackId = req.params.id;

  try {
    const track = await Tracks.findById(trackId);
    const streamingSources = await StreamingSource.find();
    res.render('add/editTrack', {
      track: track,
      streamingSources: streamingSources
    });
  } catch (error) {
    res.render('error', { message: 'Error rendering edit page', error });
  }
}

// Controller function to render userTracks.ejs to only display tracks added by the active user
async function displayUserTracks(req, res) {
  try {
    const userId = req.user._id; // Get the logged-in user's ID
    const userTracks = await Tracks.find({ user: userId });
    const user = req.user.username; // Get the logged-in user's username
    res.render('trackView/userTracks', { tracks: userTracks, user });
  } catch (error) {
    res.render('error', { message: 'Error displaying user tracks', error });
  }
}
  
  module.exports = {
    displayAllTracks,
    renderAddNewTrackPage,
    addNewTrack,
    checkTrackOwnership,
    renderEditTrackPage,
    editTrack,
    deleteTrack,
    displaySong,
    displayDate,
    displayArtist,
    displaySource,
    displayDisco,
    displayTrackDetail,
    renderEditTrackPageWithSources,
    displayUserTracks,
  };