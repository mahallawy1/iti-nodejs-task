const Post = require('../models/posts');

const createPost = async (postData) => {
    const post = new Post(postData);
    return await post.save();
};

const getAllPosts = async (query) => {
    const page = parseInt(query.page) || 1;
    const limit = parseInt(query.limit) || 10;
    const skip = (page - 1) * limit;

    const posts = await Post.find().skip(skip).limit(limit);
    const total = await Post.countDocuments();

    return {
        posts,
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit)
    };
};

const getPostById = async (id) => {
    return await Post.findById(id);
};

const updatePostById = async (id, postData) => {
    return await Post.findByIdAndUpdate(id, postData, { new: true });
};

const deletePostById = async (id) => {
    return await Post.findByIdAndDelete(id);
};

module.exports = {
    createPost,
    getAllPosts,
    getPostById,
    updatePostById,
    deletePostById
};