const mongoose = require('mongoose')
const { ObjectId } = require('mongodb');
const asyncHandler = require('express-async-handler')
const Gmdoc = require('../models/gmdocModel')

const createGmdoc = asyncHandler(async (req, res) => {
  const requiredFields = ["gmId", "doc", "type"]
  for (const field of requiredFields) {
    if (!req.body[field]) {
      res.status(400)
      throw new Error(`${field} field required`)
    }
  }
  const data = {
    gmId: ObjectId(req.body.gmId),
    doc: req.body.doc,
    type: req.body.type,
  }
  const doc = await(Gmdoc.create(data))
  res.status(200).json(doc)
})

const getGmdoc = asyncHandler(async(req, res) => {
  const gmdoc = await Gmdoc.findById(req.params.id)
  if (!gmdoc) {
    res.status(401)
    throw new Error('gmdoc not found')
  }
  res.status(200).json(gmdoc)
})

const listGmdocs = asyncHandler(async(req, res) => {
  const gmdocs = await Gmdoc.find({
    gmId: mongoose.Types.ObjectId(req.params.gmId),
  })
  res.status(200).json(gmdocs)
})

const updateGmdoc = asyncHandler(async(req, res) => {
  const gmdoc = await Gmdoc.findById(req.params.id)
  if (!gmdoc) {
    res.status(401)
    throw new Error('gmdoc not found')
  }
  const updatedGmdoc = await Gmdoc.findByIdAndUpdate(req.params.id, req.body);
  res.status(200).json(updatedGmdoc)
})

const deleteGmdoc = asyncHandler(async(req, res) => {
  const deletedGmdoc = await Gmdoc.findByIdAndDelete(req.params.id)
  res.status(200).json({
    id: req.params.id,
    item: deletedGmdoc
  })
})

module.exports = {
  createGmdoc,
  listGmdocs,
  getGmdoc,
  updateGmdoc,
  deleteGmdoc
}
