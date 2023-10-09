const express = require('express');
const router = express.Router();
const UserController = require('../controllers/user');
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const { isToCCognitoAuthenticated } = require('../middleware/is-auth');

// Customer Create Based Cognito
router.post('/new', isToCCognitoAuthenticated, UserController.customerCreate);

router.delete(
  '/delete',
  isToCCognitoAuthenticated,
  UserController.customerDelete
);

// Customer sign up
router.post('/signup', UserController.customerSignUp);

// Customer sign in
router.post('/signin', UserController.customerSignIn);

// profile photo
router.post(
  '/profile/photo',
  upload.single('imageContent'),
  isToCCognitoAuthenticated,
  UserController.UpdateProfilePhoto
);

// update profile
router.post(
  '/profile/me',
  isToCCognitoAuthenticated,
  UserController.updateProfile
);

// update password
router.post(
  '/profile/password',
  isToCCognitoAuthenticated,
  UserController.updatePassword
);

// get user profile
router.get(
  '/profile/me',
  isToCCognitoAuthenticated,
  UserController.getCustomerProfile
);

// get Video from collection
router.get(
  '/videos/videoLiked',
  isToCCognitoAuthenticated,
  UserController.getVideosFromLiked
);

// add Video to collection
router.post(
  '/videos/videoCollection/:videoPostId',
  isToCCognitoAuthenticated,
  UserController.addVideoInCollection
);

// get Video from collection
router.get(
  '/videos/videoCollection',
  isToCCognitoAuthenticated,
  UserController.getVideosFromCollection
);

// delete Video from collection
router.delete(
  '/videos/videoCollection/:videoPostId',
  isToCCognitoAuthenticated,
  UserController.deleteVideoFromCollection
);

module.exports = router;
