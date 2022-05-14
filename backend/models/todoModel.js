const mongoose = require('mongoose')

const todoSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    text: {
      type: String,
      required: true,
    },
    comments: {
      type: String,
      required: false,
    },
    done: {
      type: Boolean,
      default: false
    },
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Todo', todoSchema)
