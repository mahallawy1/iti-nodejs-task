const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const Post = require('../model/posts');

const isValidId = (id) => mongoose.Types.ObjectId.isValid(id);

router.post('/', async (req, res) => {
  try {
    const { title, content, author } = req.body;
    if (!title || !content || !author) {
      return res.status(400).json({ message: 'title, content, and author are required' });
    }
    const post = new Post(req.body);
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const skip = (page - 1) * limit;
    
    const posts = await Post.find().skip(skip).limit(limit);
    const total = await Post.countDocuments();
    
    res.status(200).json({ posts, total, page, limit, totalPages: Math.ceil(total / limit) });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

//idd
router.get('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID format' });
    
    const post = await Post.findById(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID format' });
    
    const post = await Post.findByIdAndUpdate(id, req.body, { new: true });
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    res.status(200).json(post);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

router.delete('/:id', async (req, res) => {
  try {
    const { id } = req.params;
    if (!isValidId(id)) return res.status(400).json({ message: 'Invalid ID format' });
    
    const post = await Post.findByIdAndDelete(id);
    if (!post) return res.status(404).json({ message: 'Post not found' });
    
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

module.exports = router;