const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler')
const Character = require('../models/characterModel')

const createCharacter = asyncHandler(async (req, res) => {
  const requiredFields = ["userId", "character"]
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }
  const data = {
    userId: ObjectId(req.body.userId),
    character: req.body.character,
  }
  const character = await(Character.create(data))
  res.status(200).json(character)
})

const getCharacters = asyncHandler(async(req, res) => {
  const characters = await Character.find({
    userId: mongoose.Types.ObjectId(req.params.userId),
  })
  res.status(200).json(characters)
})

const getCharacter = asyncHandler(async(req, res) => {
  const character = await Character.findById(req.params.id)
  if (!character) {
    res.status(401)
    throw new Error('character not found')
  }
  res.status(200).json(character)
})

const updateCharacter = asyncHandler(async(req, res) => {
  const character = await Character.findById(req.params.id)
  if (!character) {
    res.status(401)
    throw new Error('character not found')
  }
  const updatedCharacter = await Character.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedCharacter)
})

const deleteCharacter = asyncHandler(async(req, res) => {
  const deletedCharacter = await Character.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    item: deletedCharacter
  })
})

module.exports = {
  createCharacter,
  getCharacters,
  getCharacter,
  updateCharacter,
  deleteCharacter,
}
