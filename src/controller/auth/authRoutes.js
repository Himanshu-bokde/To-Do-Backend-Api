const authController = require("./authController");
const { loginRateLimitMiddleware } = require("../../middleware/rateLimiter");
const BASE_URI = "/api/auth";

module.exports = function (router) {
  router.post(
    BASE_URI + "/login",
    loginRateLimitMiddleware,
    authController.login
  );
  router.post(BASE_URI + "/register", authController.register);
};
