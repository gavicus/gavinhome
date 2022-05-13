const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler')
const Score = require('../models/scoreModel')

const createScore = asyncHandler(async (req, res) => {
  const requiredFields = ["user", "subject", "question"]
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }
  const data = {
    user: ObjectId(req.body.user),
    question: ObjectId(req.body.question),
    subject: req.body.subject,
    right: req.body.right || 0,
    wrong: req.body.wrong || 0,
  }
  const score = await(Score.create(data))
  res.status(200).json(score)
})

const getScores = asyncHandler(async(req, res) => {
  const scores = await Score.find({
    subject: req.params.subject,
    user: mongoose.Types.ObjectId(req.params.userId),
  })
  res.status(200).json(scores)
})

const getAllScores = asyncHandler(async(req, res) => {
  const scores = await Score.find()
  res.status(200).json(scores)
})

const getOneScore = asyncHandler(async(req, res) => {
  const score = await Score.findById(req.params.id)
  if (!score) {
    res.status(401)
    throw new Error('score not found')
  }
  res.status(200).json(score)
})

const deleteScore = asyncHandler(async(req, res) => {
  const deletedScore = await Score.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    item: deletedScore
  })
})

const updateScore = asyncHandler(async(req, res) => {
  const score = await Score.findById(req.params.id)
  if (!score) {
    res.status(401)
    throw new Error('score not found')
  }
  const updatedScore = await Score.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedScore)
})

module.exports = {
  createScore,
  getScores,
  deleteScore,
  getOneScore,
  updateScore,
  getAllScores,
}
