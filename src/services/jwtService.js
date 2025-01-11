// /services/jwtService.js

const jwt = require("jsonwebtoken");
const { secret, expiresIn } = require("../config/jwtConfig");

const generateToken = (user) => {
  const payload = { id: user.id, name: user.name, email: user.email };
  return jwt.sign(payload, secret, { expiresIn });
};

const verifyToken = (token) => {
  return jwt.verify(token, secret);
};

module.exports = { generateToken, verifyToken };
