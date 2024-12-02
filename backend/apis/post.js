const express = require('express');
const router = express.Router();
const Post = require('../db/post/post.model');
const { auth } = require('../middleware/auth');

// Get all posts (feed)
router.get('/', async (req, res) => {
  try {
    const posts = await Post.find()
      .sort({ createdAt: -1 }) 
      .populate('author', 'username') 
      .exec();

    res.json(posts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get posts by user
router.get('/user/:username', async (req, res) => {
  try {
    const posts = await Post.find()
      .populate({
        path: 'author',
        match: { username: req.params.username },
        select: 'username'
      })
      .sort({ createdAt: -1 })
      .exec();

    // Filter out posts where author is null (due to populate match)
    const userPosts = posts.filter(post => post.author);
    res.json(userPosts);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Create new post
router.post('/', auth, async (req, res) => {
  try {
    const { content } = req.body;
    
    const post = new Post({
      content,
      author: req.user._id
    });

    await post.save();
    
    // Populate author details before sending response
    await post.populate('author', 'username');
    
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update post
router.put('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to update this post' });
    }

    post.content = req.body.content;
    await post.save();
    
    await post.populate('author', 'username');
    
    res.json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Delete post
router.delete('/:postId', auth, async (req, res) => {
  try {
    const post = await Post.findById(req.params.postId);
    
    if (!post) {
      return res.status(404).json({ error: 'Post not found' });
    }

    // Check if user is the author of the post
    if (post.author.toString() !== req.user._id.toString()) {
      return res.status(403).json({ error: 'Not authorized to delete this post' });
    }

    await post.deleteOne();
    res.json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;