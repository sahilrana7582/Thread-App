const mongoose = require('mongoose');
const User = require('../models/userModel.js');
const bcrypt = require('bcrypt');
const generateToken = require('../utils/generateToken.js');

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
