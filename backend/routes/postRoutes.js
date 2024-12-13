const exress = require('express');
const { getUser } = require('../controllers/userControllers');
const {
  allPosts,
  newComment,
  getPost,
} = require('../controllers/postControllers');
const postRoutes = exress.Router();

postRoutes.route('/allPost').get(allPosts);
postRoutes.route('/:postId/comment/:userId').put(newComment);
postRoutes.route('/:id').get(getPost);

module.exports = postRoutes;
