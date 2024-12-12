const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken.js');
const {
  deleteMediaFromCloudinary,
  uploadProfile,
} = require('../utils/cloudinary.js');

exports.signUp = async (req, res) => {
  try {
    console.log(req.body, '<<<<<');
    const user = await User.create(req.body);
    res.status(200).json({
      success: true,
      message: 'Sign Up Successful',
    });
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong || ' + e,
    });
  }
};

exports.editProfile = async (req, res) => {
  try {
    const { userId } = req.body;
    let user = User.findOne({ _id: userId });

    if (user?.profilePic && req.file) {
      const publicId = user?.logoUrl.split('/').pop().split('.')[0];
      await deleteMediaFromCloudinary(publicId);
    }

    let imgRes;

    if (req.file) {
      imgRes = await uploadProfile(req.file.path);
    }

    req.body.profilePic = imgRes?.secure_url;

    user = await User.findByIdAndUpdate({ _id: userId }, req.body, {
      new: true,
    });

    res.status(200).json({
      success: true,
      user,
    });
  } catch (e) {
    res.status(500).json({
      success: true,
      message: 'Something Went Wrong While Edit Profile' + e,
    });
  }
};

exports.signIn = async (req, res) => {
  try {
    const { email = '', password = '' } = req.body;
    console.log(req.cookie);

    if (!email && !password) {
      return res.status(402).json({
        success: false,
        message: 'Please Provide All Fields',
      });
    }
    const user = await User.findOne({ email: email });

    const validatePass = bcrypt.compare(password, user.password);

    if (!validatePass) {
      return res.status(401).json({
        success: false,
        message: 'Password Wrong!',
      });
    }
    generateToken(user, res);
  } catch (e) {
    res.status(500).json({
      success: false,
      message: 'Something Went Wrong || ' + e,
    });
  }
};
