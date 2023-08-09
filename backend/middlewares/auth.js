const mongoose = require('mongoose');
const { checkToken } = require('../utils/jwtAuth');

const UnauthorizedError = require('../errors/unauthorizedError'); // 401

const auth = (req, res, next) => {
  if (!req.headers.authorization) {
    throw new UnauthorizedError('Вы не авторизованы');
  }

  const token = req.headers.authorization.replace('Bearer ', '');

  try {
    const payload = checkToken(token);

    req.user = {
      _id: new mongoose.Types.ObjectId(payload._id),
    };
    next();
  } catch (err) {
    next(new UnauthorizedError('Вы не авторизованы'));
  }
};

module.exports = auth;

// const jwt = require('jsonwebtoken');
// const UnauthorizedError = require('../errors/unauthorizedError'); // 401

// const { NODE_ENV, JWT_SECRET } = process.env;

// module.exports = (req, res, next) => {
//   const { authorization } = req.headers;

//   if (!authorization || !authorization.startsWith('Bearer ')) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   const token = authorization.replace('Bearer ', '');
//   let payload;

//   try {
//     payload = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
//   } catch (err) {
//     return next(new UnauthorizedError('Необходима авторизация'));
//   }

//   req.user = payload;

//   return next();
// };
