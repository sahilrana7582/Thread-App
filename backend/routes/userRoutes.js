const exress = require('express');

const { signUp, signIn } = require('../controllers/authControllers');
const {
  createNewPost,
  getUserAllPosts,
  likePost,
  unLike,
  newComment,
  deleteComment,
  allPosts,
} = require('../controllers/postControllers');
const upload = require('../utils/upload');

const userRoutes = exress.Router();

userRoutes.route('/').post((req, res) => {
  res.send('Working');
});

userRoutes.route('/signup').post(signUp);
userRoutes.route('/signin').post(signIn);

userRoutes.route('/newpost').post(upload.single('media'), createNewPost);
userRoutes.route('/post/:id').get(getUserAllPosts);
userRoutes.route('/post/:postId/like/:userId').put(likePost).patch(unLike);
userRoutes.route('/post/:postId/comment/:userId').post(newComment);
userRoutes
  .route('/post/:postId/comment/:userId/:commentId')
  .delete(deleteComment);

userRoutes.route('/allPost').get(allPosts);
module.exports = userRoutes;
