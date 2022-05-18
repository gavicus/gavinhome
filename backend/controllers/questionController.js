const asyncHandler = require('express-async-handler')
const Question = require('../models/questionModel')
const User = require('../models/userModel')

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()

  res.status(200).json(questions)
})

const getOneQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (!question) {
    res.status(400)
    throw new Error('question not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }

  res.status(200).json(question)
})

const createQuestion = asyncHandler(async (req, res) => {
  const fields = [
    'subject', // japanese, russian
    'type', // hiragana, katakana, kanji
    'question',
    'answer',
  ]
  for (const field of fields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  if (!user.admin) {
    res.status(401)
    throw new Error('user not authorized')
  }

  const question = await Question.create({
    subject: req.body.subject,
    type: req.body.type,
    question: req.body.question,
    answer: req.body.answer,
    message: req.body.message,
    similar: req.body.similar || [],
  })

  res.status(200).json(question)
})

const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (!question) {
    res.status(400)
    throw new Error('question not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  if (!user.admin) {
    res.status(401)
    throw new Error('user not authorized')
  }

  const updatedQuestion = await Question.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedQuestion)
})

const deleteQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (!question) {
    res.status(400)
    throw new Error('question not found')
  }

  const user = await User.findById(req.user.id)
  if (!user) {
    res.status(401)
    throw new Error('user not found')
  }
  if (!user.admin) {
    res.status(401)
    throw new Error('user not authorized')
  }

  const deletedQuestion = await Question.findByIdAndDelete(req.params.id)

  res.status(200).json({
    id: req.params.id,
    item: deletedQuestion
  })
})

const getSubjects = asyncHandler(async (req, res) => {
  const questions = await Question.find()
  const all = questions.map(q => q.subject)
  const unique = new Set(all)
  const result = Array.from(unique)
  res.status(200).json(result)
})

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
  getOneQuestion,
  getSubjects,
}
