const auth = require("../controller/auth/authRoutes");
const user = require("../controller/user/userRoutes");
const todo = require("../controller/task/todoRoutes");

module.exports = function (app) {
  auth(app);
  user(app);
  todo(app);
};
