// /controllers/userController.js

const authenticateToken =
  require("../../middleware/authMiddleware").authenticateToken;

const getUserProfile = (req, res) => {
  const { user } = req;
  res.json(user);
};

module.exports = { getUserProfile };
