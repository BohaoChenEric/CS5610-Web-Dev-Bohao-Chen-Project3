const User = require('../db/user/user.model');

exports.validateUser = (userData) => {
  const errors = {};
  
  if (!userData.username) {
    errors.username = 'Username is required';
  } else if (userData.username.length < 3) {
    errors.username = 'Username must be at least 3 characters long';
  }
  
  if (!userData.password) {
    errors.password = 'Password is required';
  } else if (userData.password.length < 6) {
    errors.password = 'Password must be at least 6 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

exports.formatUser = (user) => {
  return {
    id: user._id,
    username: user.username,
    description: user.description,
    createdAt: user.createdAt
  };
};