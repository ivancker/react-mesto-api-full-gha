const jwt = require('jsonwebtoken');

const { NODE_ENV, JWT_SECRET } = process.env;

const checkToken = (token) => jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

const signToken = (payload) => jwt.sign(payload, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key', { expiresIn: '7d' });

module.exports = {
  checkToken,
  signToken,
};
