const jwt = require('jsonwebtoken');

export const isAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;

    if (!token) {
      return res.status(401).json({
        success: false,
        message: 'Authentication token not found. Please log in.',
      });
    }

    const decode = jwt.verify(token, process.env.KEY);

    req.id = decode.id;
    next();
  } catch (e) {
    console.error('Authentication Error:', e.message);
    res.status(401).json({
      success: false,
      message: 'Invalid or expired token. Please log in again.',
    });
  }
};
