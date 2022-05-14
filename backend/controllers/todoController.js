const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler')
const Todo = require('../models/todoModel')

const createTodo = asyncHandler(async (req, res) => {
  const requiredFields = ["userId", "text"]
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }
  const data = {
    userId: ObjectId(req.body.userId),
    text: req.body.text,
    comments: req.body.comments,
    done: req.body.done,
  }
  const todo = await(Todo.create(data))
  res.status(200).json(todo)
})

const getTodos = asyncHandler(async(req, res) => {
  const todos = await Todo.find({
    userId: mongoose.Types.ObjectId(req.params.userId),
  })
  res.status(200).json(todos)
})

const getOneTodo = asyncHandler(async(req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) {
    res.status(401)
    throw new Error('todo not found')
  }
  res.status(200).json(todo)
})

const deleteTodo = asyncHandler(async(req, res) => {
  const deletedTodo = await Todo.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    item: deletedTodo
  })
})

const updateTodo = asyncHandler(async(req, res) => {
  const todo = await Todo.findById(req.params.id)
  if (!todo) {
    res.status(401)
    throw new Error('todo not found')
  }
  const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedTodo)
})

module.exports = {
  createTodo,
  getTodos,
  getOneTodo,
  deleteTodo,
  updateTodo,
}
