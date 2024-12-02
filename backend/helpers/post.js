const Post = require('../db/post/post.model');

exports.validatePost = (content) => {
  const errors = {};
  
  if (!content) {
    errors.content = 'Content is required';
  } else if (content.length > 280) {
    errors.content = 'Content cannot exceed 280 characters';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

exports.formatPost = (post) => {
  return {
    id: post._id,
    content: post.content,
    author: {
      id: post.author._id,
      username: post.author.username
    },
    createdAt: post.createdAt,
    updatedAt: post.updatedAt
  };
};