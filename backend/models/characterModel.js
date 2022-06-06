const mongoose = require('mongoose')

const characterSchema = mongoose.Schema(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true
    },
    character: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Character', characterSchema)
