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
