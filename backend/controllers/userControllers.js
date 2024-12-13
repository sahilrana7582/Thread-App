const mongoose = require('mongoose');
const User = require('../models/userModel');

exports.getAllUsers = async (req, res) => {
  try {
    const { name } = req.query;
    const users = await User.find({
      username: { $regex: `^${name}`, $options: 'i' },
    });

    res.status(200).json({
      success: true,
      users,
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong While Getting Users' + e,
    });
  }
};

exports.follow = async (req, res) => {
  const { byFollow, toFollow } = req.params;

  try {
    const users = await User.find({
      username: { $in: [byFollow, toFollow] },
    });

    if (users.length !== 2) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const byFollowUser = users.find((user) => user.username === byFollow);
    const toFollowUser = users.find((user) => user.username === toFollow);

    if (!byFollowUser || !toFollowUser) {
      return res.status(404).json({ message: 'One or both users not found' });
    }

    const user = await User.findByIdAndUpdate(
      byFollowUser._id,
      {
        $addToSet: { following: toFollowUser._id },
      },
      { new: true }
    );

    const user2 = await User.findByIdAndUpdate(toFollowUser._id, {
      $addToSet: { followers: byFollowUser._id },
    });

    res.status(200).json({
      success: true,
      message: 'Follow Successful',
      user,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred while following' });
  }
};

exports.getUser = async (req, res) => {
  try {
    const user = await User.findOne({ username: req.params.username })
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
};
