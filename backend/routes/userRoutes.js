const exress = require('express');

const {
  signUp,
  signIn,
  editProfile,
  logout,
} = require('../controllers/authControllers');
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
const {
  getAllUsers,
  follow,
  getUser,
} = require('../controllers/userControllers');

const userRoutes = exress.Router();

userRoutes.route('/').post((req, res) => {
  res.send('Working');
});

userRoutes.route('/signup').post(signUp);
userRoutes.route('/signin').post(signIn);

userRoutes.route('/logout').get(logout);

userRoutes.route('/search').get(getAllUsers);

userRoutes.route('/:username').get(getUser);

userRoutes.route('/newpost').post(upload.single('media'), createNewPost);
userRoutes.route('/post/:id').get(getUserAllPosts);
userRoutes.route('/post/:postId/like/:userId').put(likePost).patch(unLike);
userRoutes.route('/editProfile').put(upload.single('profilePic'), editProfile);
userRoutes
  .route('/post/:postId/comment/:userId/:commentId')
  .delete(deleteComment);

userRoutes.route('/follow/:byFollow/:toFollow').put(follow);

module.exports = userRoutes;
