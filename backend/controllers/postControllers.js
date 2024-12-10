const mongoose = require('mongoose');
const { uploadMedia } = require('../utils/cloudinary');
const Post = require('../models/postModel');
const Like = require('../models/likeModel');
const { ObjectId } = require('mongoose').Types;

exports.createNewPost = async (req, res) => {
  try {
    // const userId = req.userId;

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

    const posts = await Post.find().populate('likes');
    console.log(posts);

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

    const post = await Post.findOneAndUpdate(
      {
        _id: postId,
        likes: { $eq: new ObjectId(userId) },
      },
      {
        
      }
    );

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
