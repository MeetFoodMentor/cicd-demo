const express = require('express');
const router = express.Router();
const multer = require('multer');
const upload = multer({ dest: 'uploads/' });
const VideoPostController = require('../controllers/videopost');
const {
  isToCCognitoAuthenticatedOptional,
  isToCCognitoAuthenticated,
} = require('../middleware/is-auth');

router.get(
  '/videos',
  isToCCognitoAuthenticatedOptional,
  VideoPostController.fetchVideoPost
);

router.put(
  '/like/:videoPostId',
  isToCCognitoAuthenticated,
  VideoPostController.likeVideoPost
);

router.put(
  '/unlike/:videoPostId',
  isToCCognitoAuthenticated,
  VideoPostController.unlikeVideoPost
);

// Add a comment to a videoPost
router.post(
  '/comment/:videoPostId',
  isToCCognitoAuthenticated,
  VideoPostController.postComment
);

// Delete a comment to a videoPost
router.delete(
  '/comment/:videoPostId/:commentId',
  isToCCognitoAuthenticated,
  VideoPostController.deleteComment
);

// Get a video post by videoPostId
router.get(
  '/:videoPostId',
  isToCCognitoAuthenticated,
  VideoPostController.getVideoPost
);

// Delete a video post by videoPostId
router.delete(
  '/customer/:videoPostId',
  isToCCognitoAuthenticated,
  VideoPostController.deleteCustomerVideoPost
);

// Create new video post
router.post(
  '/new',
  isToCCognitoAuthenticated,
  VideoPostController.createVideoPost
);

// Upload a new video file
router.post(
  '/upload',
  isToCCognitoAuthenticated,
  upload.single('video-content'),
  VideoPostController.uploadVideo
);

// Upload a new cover image file
router.post(
  '/coverImage',
  isToCCognitoAuthenticated,
  upload.single('cover-image'),
  VideoPostController.uploadCoverImage
);

module.exports = router;
