const mongoose = require('mongoose')
const asyncHandler = require('express-async-handler')
const Data = require('../models/dataModel')

const createData = asyncHandler(async (req, res) => {
  const requiredFields = ["project", "doc"]
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }
  const data = {
    project: req.body.project,
    doc: req.body.doc,
    type: req.body.type,
    userId: req.body.userId,
  }
  const doc = await(Data.create(data))
  res.status(200).json(doc)
})

const listData = asyncHandler(async(req, res) => {
  const data = await Data.find({
    userId: mongoose.Types.ObjectId(req.params.userId),
  })
  res.status(200).json(data)
})

const getData = asyncHandler(async(req, res) => {
  const data = await Data.findById(req.params.id)
  if (!data) {
    res.status(401)
    throw new Error('data not found')
  }
  res.status(200).json(data)
})

const updateData = asyncHandler(async(req, res) => {
  const data = await Data.findById(req.params.id)
  if (!data) {
    res.status(401)
    throw new Error('data not found')
  }
  const updatedData = await Data.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedData)
})

const deleteData = asyncHandler(async(req, res) => {
  const deletedData = await Data.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    item: deletedData
  })
})

module.exports = {
  createData,
  listData,
  getData,
  updateData,
  deleteData
}
