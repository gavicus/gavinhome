const asyncHandler = require('express-async-handler')

const getQuestions = asyncHandler(async (req, res) => {
  res.status(200).json({ message: 'Get questions' })
})

const createQuestion = asyncHandler(async (req, res) => {
  console.log('req.body',req.body)
  if (!req.body.question) {
    res.status(400)
    throw new Error('question field required')
  }
  res.status(200).json({ message: 'Create question'})
})

const updateQuestion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Update question ${req.params.id}`})
})

const deleteQuestion = asyncHandler(async (req, res) => {
  res.status(200).json({ message: `Delete question ${req.params.id}`})
})

module.exports = {
  getQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
}
