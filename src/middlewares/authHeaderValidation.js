const jwt = require('jsonwebtoken');
require('dotenv').config();
const { findUserByIdService } = require('../services/users');

const authHeaderValidation = async (req, res, next) => {
  const authHeader = req.header('authorization');

  try {
    if (!authHeader) {
      throw new Error('token-no-token');
    }

    const [tokenType, token] = authHeader.split(' ');

    if (!tokenType || tokenType !== 'Bearer') {
      throw new Error('token-invalid');
    }
    if (!token) {
      throw new Error('token-invalid');
    }

    const { _id } = jwt.verify(token, process.env.JWT_SECRET);

    const user = await findUserByIdService(_id);

    if (!user) {
      throw new Error('token-no-user');
    }

    if (user.token !== token) {
      throw new Error('token-invalid');
    }

    req.user = user;
  } catch (error) {
    return res.status(401).json({
      code: error.message,
    });
  }

  next();
};

module.exports = authHeaderValidation;