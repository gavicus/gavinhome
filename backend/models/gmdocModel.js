const mongoose = require('mongoose')

const gmdocSchema = mongoose.Schema(
  {
    gmId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Gm',
      required: true
    },
    type: {
      type: String,
      required: true,
    },
    doc: mongoose.Schema.Types.Mixed,
  },
  {
    timestamps: true,
  },
)

module.exports = mongoose.model('Gmdoc', gmdocSchema)
