const todoController = require("./todoController");
const authenticateToken =
  require("../../middleware/authMiddleware").authenticateToken;
const BASE_URI = "/api/todo";

module.exports = function (router) {
  router.post(
    BASE_URI + "/create",
    authenticateToken,
    todoController.createTodo
  );
};
