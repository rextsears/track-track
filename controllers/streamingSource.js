const StreamingSource = require('../models/streamingSource');

async function renderAddStreamingSourcePage(req, res) {
    res.render('add/addStreamingSource');
  };

async function addStreamingSource(req, res) {
  const { name } = req.body;
  try {
    const newStreamingSource = new StreamingSource({ name });
    await newStreamingSource.save();
    res.redirect('/streamingSourceView');
  } catch (error) {
    res.render('error', { message: 'Error adding streaming source', error });
  }
};

// Controller function to display all streaming sources
async function displayAllStreamingSources(req, res) {
  try {
    const streamingSources = await StreamingSource.find();
    res.render('streamingSourceView', { streamingSources });
  } catch (error) {
    res.render('error', { message: 'Error displaying streaming sources', error });
  }
};

// Controller function to render the editStreamingSource page
async function renderEditStreamingSourcePage(req, res) {
  const sourceId = req.params.id;
  try {
    const streamingSource = await StreamingSource.findById(sourceId);
    res.render('editStreamingSource', { streamingSource });
  } catch (error) {
    res.render('error', { message: 'Error rendering edit streaming source page', error });
  }
};

// Controller function to edit a streaming source
async function editStreamingSource(req, res) {
  const sourceId = req.params.id;
  const updatedName = req.body.name;
  try {
    await StreamingSource.findByIdAndUpdate(sourceId, { name: updatedName });
    res.redirect('/streamingSourceView');
  } catch (error) {
    res.render('error', { message: 'Error editing streaming source', error });
  }
};

// Controller function to delete a streaming source
async function deleteStreamingSource(req, res) {
  const sourceId = req.params.id;
  try {
    await StreamingSource.findByIdAndDelete(sourceId);
    res.redirect('/streamingSourceView');
  } catch (error) {
    res.render('error', { message: 'Error deleting streaming source', error });
  }
};

module.exports = {
  renderAddStreamingSourcePage,
  addStreamingSource,
  displayAllStreamingSources,
  renderEditStreamingSourcePage,
  editStreamingSource,
  deleteStreamingSource,
};