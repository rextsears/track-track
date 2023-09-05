const mongoose = require('mongoose');

mongoose.connect('mongodb+srv://tomsears90:NTryYQCLLgdtNH6F@cluster0.41oubkj.mongodb.net/trackTrack?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => {
    console.log('Connected to the database');
  })
  .catch((error) => {
    console.error('Error connecting to the database:', error);
  });

  module.exports = mongoose.connection;