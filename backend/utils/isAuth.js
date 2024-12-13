const jwt = require('jsonwebtoken');

exports.isAuth = async (req, res, next) => {
  try {
    const token = req?.cookies?.token;
    // const token = req?.headers.cookies;

    if (!token) {
      return res.status(200).json({
        success: false,
        message: 'No Cookie Found logged iN',
      });
    }

    const decode = await jwt.verify(token, process.env.KEY);

    if (!token) {
      return res.status(200).json({
        success: false,
        message: 'You are not authenticated please logged iN',
      });
    }
    req.id = decode.userID;
    next();
  } catch (e) {
    console.log(e, 'Cookie Erro');
  }
};
