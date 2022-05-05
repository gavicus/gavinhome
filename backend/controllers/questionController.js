const asyncHandler = require('express-async-handler')

const Question = require('../models/questionModel')

const getQuestions = asyncHandler(async (req, res) => {
  const questions = await Question.find()

  res.status(200).json(questions)
})

const createQuestion = asyncHandler(async (req, res) => {
  const fields = [
    'subject', // japanese, russian
    'type', // hiragana, katakana, kanji
    'question',
    'answer',
    // 'message', // not required
  ]
  for (const field of fields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }

  const question = await Question.create({
    subject: req.body.subject,
    type: req.body.type,
    question: req.body.question,
    answer: req.body.answer,
    message: req.body.message,
  })

  res.status(200).json(question)
})

const updateQuestion = asyncHandler(async (req, res) => {
  const question = await Question.findById(req.params.id)

  if (!question) {
    res.status(400)
    throw new Error('question not found')
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

  const deletedQuestion = await Question.findByIdAndDelete(req.params.id)

  res.status(200).json({
    id: req.params.id,
    item: deletedQuestion
  })
})

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}
