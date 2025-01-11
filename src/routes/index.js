const auth = require("../controller/auth/authRoutes");
const user = require("../controller/user/userRoutes");

module.exports = function (app) {
  auth(app);
  user(app);
};
