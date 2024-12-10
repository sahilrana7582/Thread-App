const jwt = require('jsonwebtoken');
exports.generateToken = (username, id, res) => {
  const key = process.env.KEY;
  const token = jwt.sign({ username, id }, key, { expiresIn: '1d' });

  res
    .cookie('token', token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 24 * 60 * 60 * 1000,
    })
    .status(200)
    .json({
      success: true,
      message: 'Sign In Successful',
    });
};
