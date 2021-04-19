const mongoose = require('mongoose')

const educationSchema = mongoose.Schema(
  {
    school: {
      type: String,
      required: true,
    },
    degree: {
      type: String,
      required: true,
    },
    field: {
      type: String,
      required: true,
    },
    start_year: {
      type: Date,
      required: true,
    },
    end_year: {
      type: Date,
      required: true,
    },
    grade: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('Education', educationSchema)
