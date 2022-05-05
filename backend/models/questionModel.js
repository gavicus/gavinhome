const mongoose = require('mongoose')

const questionSchema = mongoose.Schema(
  {
    subject: {
      type: String,
      required: [true, 'please enter a subject'],
    },
    type: {
      type: String,
      required: [true, 'please enter a type'],
    },
    question: {
      type: String,
      required: [true, 'please enter a question'],
    },
    answer: {
      type: String,
      required: [true, 'please enter a answer'],
    },
    message: {
      type: String,
      required: false,
    }
  },
  {
    timestamps: false,
  },
)

module.exports = mongoose.model('Question', questionSchema)
