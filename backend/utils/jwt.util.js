const jwt = require('jsonwebtoken');
const JWT_SECRET = process.env.JWT_SECRET || 'Qw3rT!9zXy7$Lp0vBn6@eFgH#jKl2^sDf';

exports.signToken = (payload) => {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '5d' });
};

exports.verifyToken = (token) => {
  return jwt.verify(token, JWT_SECRET);
};
