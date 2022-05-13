const mongoose = require('mongoose')

const scoreSchema = mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    subject: {
      type: String,
      required: true,
    },
    question: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Question',
      required: true
    },
    right: { type: Number },
    wrong: { type: Number }
  },
  {
    timestamps: false,
  },
)

module.exports = mongoose.model('Score', scoreSchema)
