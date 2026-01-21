const postService = require('../services/posts');
const APIError = require('../utils/APIError');

const createPost = async (req, res, next) => {
  try {
    const post = await postService.createPost(req.body, req.user.userId);
    res.status(201).json(post);
  } catch (error) {
    next(error);
  }
};

const getAllPosts = async (req, res, next) => {
  try {
    const posts = await postService.getAllPosts(req.user.userId);
    res.status(200).json(posts);
  } catch (error) {
    next(error);
  }
};

const getPostById = async (req, res, next) => {
  try {
    const post = await postService.getPostById(req.params.id, req.user.userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const updatePostById = async (req, res, next) => {
  try {
    const post = await postService.updatePostById(req.params.id, req.body, req.user.userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    res.status(200).json(post);
  } catch (error) {
    next(error);
  }
};

const deletePostById = async (req, res, next) => {
  try {
    const post = await postService.deletePostById(req.params.id, req.user.userId);
    if (!post) {
      throw new APIError('Post not found', 404);
    }
    res.status(200).json({ message: 'Post deleted successfully' });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
};