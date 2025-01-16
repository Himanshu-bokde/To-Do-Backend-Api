const todoController = require("./todoController");
const authenticateToken =
  require("../../middleware/authMiddleware").authenticateToken;
const BASE_URI = "/api/todo";

module.exports = function (router) {
  router.post(BASE_URI + "/create",authenticateToken,todoController.createTodo);
  router.get(BASE_URI + "/list",authenticateToken,todoController.listTodo);
  router.post(BASE_URI + "/delete",authenticateToken,todoController.deletTodoList);
  router.put(BASE_URI + "/edit",authenticateToken,todoController.editTodoList);
  
  

};
