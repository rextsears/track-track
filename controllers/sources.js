const Source = require('../models/sourceSchema');

// Controller function to display all sources
function displayAllSources(req, res) {
  Source.find()
    .then(sources => {
      res.render('viewSources/all', { sources });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

module.exports = {
  displayAllSources,
};