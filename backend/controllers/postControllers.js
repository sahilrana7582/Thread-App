const mongoose = require('mongoose');
const { uploadMedia } = require('../utils/cloudinary');
const Post = require('../models/postModel');
const Comment = require('../models/commentModel');
const { populate } = require('dotenv');
const { ObjectId } = require('mongoose').Types;

exports.createNewPost = async (req, res) => {
  try {
    const { title } = req.body;
    userId = '675818ca83760c40c58e0f0c';
    const file = req.file;
    console.log(file);
    console.log(req.body);
    const mediaRes = await uploadMedia(file.path);

    if (!mediaRes) {
      return res.status(400).json({
        success: false,
        message: 'Image not uploaded',
      });
    }

    const post = await Post.create({
      title,
      media: mediaRes.secure_url,
      user: userId,
    });

    if (!post) {
      return res.status(400).json({
        success: false,
        message: 'Post not created',
      });
    }

    res.status(200).json({
      success: true,
      message: 'Post Created',
    });
  } catch (e) {
    res.status(200).json({
      success: false,
      messgae: 'Something Went Wrong While Creating New Post' + e,
    });
  }
};

exports.getUserAllPosts = async (req, res) => {
  try {
    const { id } = req.params;
    console.log(req.params);

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({
        success: false,
        message: 'Invalid post ID',
      });
    }

    const posts = await Post.find()
      .populate('likes', 'username -_id')
      .populate({
        path: 'comments',
        populate: {
          path: 'userId',
          model: 'User',
          select: 'username',
        },
      });

    res.status(200).json({
      success: true,
      posts,
    });
  } catch (e) {
    res.status(500).json({
      success: true,
      message: 'Something Went Wrong While Getting User Post' + e,
    });
  }
};

exports.likePost = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log(req.params);

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        likes: { $ne: new ObjectId(userId) },
      },
      {
        $inc: { likeCount: +1 },
        $push: {
          likes: new ObjectId(userId),
        },
      },
      { new: true }
    );
    console.log(post);

    res.status(200).json({
      success: true,
      message: 'Post Liked',
    });
  } catch (e) {
    res.status(500).json({
      success: true,
      message: 'Something Went Wrong While Getting User Post' + e,
    });
  }
};

exports.unLike = async (req, res) => {
  try {
    const { postId, userId } = req.params;
    console.log(req.params);

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        likes: new ObjectId(userId),
      },
      {
        $inc: { likeCount: -1 },
        $pull: {
          likes: new ObjectId(userId),
        },
      },
      { new: true }
    );
    console.log(post);

    res.status(200).json({
      success: true,
      message: 'Post Unliked',
    });
  } catch (e) {
    res.status(500).json({
      success: true,
      message: 'Something Went Wrong While Getting User Post' + e,
    });
  }
};

exports.newComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId, userId } = req.params;
    const comment = await Comment.create({ text, userId, postId });

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          comments: new ObjectId(comment._id),
        },
      }
    );
    res.status(200).json({
      success: true,
      message: 'Commented',
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something Went Wrong' + e,
    });
  }
};

exports.deleteComment = async (req, res) => {
  try {
    const { text } = req.body;
    const { postId, userId, commentId } = req.params;

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        comments: new ObjectId(commentId),
      },
      {
        $pull: {
          comments: new ObjectId(commentId),
        },
      }
    );

    const comment = await Comment.findByIdAndDelete({ _id: commentId });
    res.status(200).json({
      success: true,
      message: 'Comment Deleted',
    });
  } catch (e) {
    res.status(500).json({
      status: false,
      message: 'Something Went Wrong' + e,
    });
  }
};

exports.allPosts = async (req, res) => {
  try {
    const post = await Post.find();

    res.status(200).json({
      success: true,
      post,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong' + e,
    });
  }
};
