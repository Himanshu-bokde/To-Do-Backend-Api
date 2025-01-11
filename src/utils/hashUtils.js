// /utils/hashUtils.js

const crypto = require('crypto');

// Hash a password
const hashPassword = (password) => {
  const hash = crypto.createHash('sha256');
  hash.update(password);
  return hash.digest('hex');  // Return the hash in hex format
};

// Compare a password with a hashed password
const comparePassword = (password, hashedPassword) => {
  const hashedInputPassword = hashPassword(password);
  return hashedInputPassword === hashedPassword;
};

module.exports = { hashPassword, comparePassword };