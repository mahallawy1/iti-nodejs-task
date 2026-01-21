const Post = require('../models/posts');
const APIError = require('../utils/APIError');

const createPost = async (data, userId) => {
  return Post.create({
    ...data,
    userId
  });
};

const getAllPosts = async (userId) => {
  const posts = await Post.find().populate('userId', 'name email');
  
  return posts.map(post => {
    const postObj = post.toObject();
    // Compare the populated userId._id with the authenticated userId
    postObj.isOwner = post.userId._id.toString() === userId;
    return postObj;
  });
};

const getPostById = async (id, userId) => {
  const post = await Post.findById(id).populate('userId', 'name email');
  if (!post) return null;
  
  const postObj = post.toObject();
  // Compare the populated userId._id with the authenticated userId
  postObj.isOwner = post.userId._id.toString() === userId;
  return postObj;
};

const updatePostById = async (id, data, userId) => {
  const post = await Post.findById(id);
  if (!post) return null;
  
  // Check ownership - compare userId field directly (not populated here)
  if (post.userId.toString() !== userId) {
    throw new APIError('You are not authorized to update this post', 403);
  }
  
  return await Post.findByIdAndUpdate(id, data, { 
    new: true, 
    runValidators: true 
  });
};

const deletePostById = async (id, userId) => {
  const post = await Post.findById(id);
  if (!post) return null;
  
  // Check ownership - compare userId field directly (not populated here)
  if (post.userId.toString() !== userId) {
    throw new APIError('You are not authorized to delete this post', 403);
  }
  
  return await Post.findByIdAndDelete(id);
};

module.exports = {
  createPost,
  getAllPosts,
  getPostById,
  updatePostById,
  deletePostById
};