
const express = require('express');
const router = express.Router();
const postsController = require('../controllers/posts');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/auth');
const { createPostSchema, getAllPostsSchema, updatePostSchema } = require('../schemas/posts');

router.post('/', authenticate, validate(createPostSchema), postsController.createPost);
router.get('/', authenticate, validate(getAllPostsSchema), postsController.getAllPosts);
router.get('/:id', authenticate, postsController.getPostById);
router.patch('/:id', authenticate, validate(updatePostSchema), postsController.updatePostById);
router.delete('/:id', authenticate, postsController.deletePostById);

module.exports = router;