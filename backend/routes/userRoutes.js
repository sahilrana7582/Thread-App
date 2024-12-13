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
const User = require('../models/userModel');
const { isAuth } = require('../utils/isAuth');

const userRoutes = exress.Router();

userRoutes.route('/').get(isAuth, async (req, res) => {
  try {
    const user = await User.findOne({ _id: req.id })
      .populate('following')
      .populate('followers')
      .populate('posts');
    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: true,
      message: 'Something Went Wrong' + e,
    });
  }
});

userRoutes.route('/signup').post(signUp);
userRoutes.route('/signin').post(signIn);

userRoutes.route('/logout').get(logout);

userRoutes.route('/search').get(getAllUsers);

userRoutes.route('/:username').get(getUser);

userRoutes.route('/newpost').post(upload.single('media'), createNewPost);
userRoutes.route('/allPosts/:id').get(getUserAllPosts);
userRoutes.route('/post/:postId/like/:userId').put(likePost).patch(unLike);
userRoutes.route('/editProfile').put(upload.single('profilePic'), editProfile);
userRoutes
  .route('/post/:postId/comment/:userId/:commentId')
  .delete(deleteComment);

userRoutes.route('/follow/:byFollow/:toFollow').put(follow);

module.exports = userRoutes;
