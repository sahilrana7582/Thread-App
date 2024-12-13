const mongoose = require('mongoose');
const { uploadMedia } = require('../utils/cloudinary');
const Post = require('../models/postModel');
const { populate } = require('dotenv');
const User = require('../models/userModel');
const { ObjectId } = require('mongoose').Types;

exports.createNewPost = async (req, res) => {
  try {
    const { title, userId } = req.body;
    const file = req.file;

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

    await User.findByIdAndUpdate(userId, {
      $push: { posts: post._id },
    });

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

    const posts = await Post.find({ _id: id })
      .populate('likes', 'username -_id')
      .populate('user')
      .populate('comments.user');

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
    const { commentText } = req.body;
    const { postId, userId } = req.params;
    console.log(req.body, req.params);

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $push: {
          comments: { user: userId, commentText: commentText },
        },
      },
      { new: true }
    );
    res.status(200).json({
      success: true,
      postId: post._id,
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
    const { userData } = req.query;

    const parsedUserdata = JSON.parse(userData);
    console.log(parsedUserdata);

    if (!Array.isArray(parsedUserdata)) {
      return res.status(400).json({ error: 'Invalid userdata format' });
    }

    const post = await Post.find({
      user: { $in: parsedUserdata },
    }).populate('user');

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

exports.getPost = async (req, res) => {
  const { id } = req.params;
  try {
    const post = await Post.findOne({ _id: id })
      .populate('user')
      .populate({
        path: 'comments',
        populate: {
          path: 'user',
          model: 'User',
        },
      });

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
