const express = require('express');
const usersController = require('../controllers/user');
const schemas = require('../schemas');
const validate = require('../middlewares/validate');
const authenticate = require('../middlewares/auth');
const restrictTo = require('../middlewares/restrictTo');

const router = express.Router();



//Public routes
// sign up
router.post('/sign-up', validate(schemas.user.signupschema), usersController.signUp);

// sign in
router.post('/sign-in', validate(schemas.user.signinschema), usersController.signIn);


// Protected routes
// get all users/*
router.get('/', authenticate, restrictTo(['admin']), validate(schemas.user.getAllUsersSchema), usersController.getAllUsers);


// get user by id
router.get('/:id', usersController.getUserById);

// update user by id
router.patch('/:id', validate(schemas.user.updateUserSchema), usersController.updateUserById);


// delete user by id
router.delete('/:id', usersController.deleteUserById);


module.exports = router;