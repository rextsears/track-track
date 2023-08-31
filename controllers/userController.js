const User = require('../models/User');

// Controller function to get user data by ID
async function getUserById(userId) {
  try {
    const user = await User.findById(userId);
    return user;
  } catch (error) {
    throw new Error('Error fetching user by ID');
  }
}

// Controller function to create a new user
async function createUser(googleId, username) {
  try {
    const newUser = new User({ googleId, username });
    await newUser.save();
    return newUser;
  } catch (error) {
    throw new Error('Error creating user');
  }
}

module.exports = {
  getUserById,
  createUser,
};