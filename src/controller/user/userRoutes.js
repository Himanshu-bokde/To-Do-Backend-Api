// /routes/userRoutes.js

const userController = require("./userController");
const authenticateToken =
  require("../../middleware/authMiddleware").authenticateToken;
const BASE_URI = "/api/user";

module.exports = function (router) {
  router.get(
    BASE_URI + "/profile",
    authenticateToken,
    userController.getUserProfile
  );
};
