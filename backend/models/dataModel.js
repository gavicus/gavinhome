const mongoose = require('mongoose')

const dataSchema = mongoose.Schema(
  {
    project: {
      type: String,
      required: true
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
    },
    doc: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Data', dataSchema)
