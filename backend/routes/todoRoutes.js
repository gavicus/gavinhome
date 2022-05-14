const express = require('express')
const router = express.Router()
const {
  createTodo,
  getTodos,
  getOneTodo,
  deleteTodo,
  updateTodo,
} = require("../controllers/todoController");

router.route("/").post(createTodo)
router.route("/user/:userId").get(getTodos)
router.route("/:id").delete(deleteTodo).get(getOneTodo).put(updateTodo)

module.exports = router
