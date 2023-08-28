const Discovery = require('../models/discoverySchema');

// Controller function to display all discoveries
function displayAllDiscoveries(req, res) {
  Discovery.find()
    .then(discoveries => {
      res.render('viewDiscoveries/all', { discoveries });
    })
    .catch(error => {
      res.status(500).json({ message: error.message });
    });
}

module.exports = {
  displayAllDiscoveries,
};