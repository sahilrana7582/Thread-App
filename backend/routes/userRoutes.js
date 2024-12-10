const exress = require('express');

const { signUp, signIn } = require('../controllers/authControllers');
const {
  createNewPost,
  getUserAllPosts,
  likePost,
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
userRoutes.route('/post/:postId/like/:userId').post(likePost);

module.exports = userRoutes;
