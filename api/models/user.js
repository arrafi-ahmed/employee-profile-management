const mongoose = require('mongoose')

const userSchema = mongoose.Schema(
  {
    username: {
      type: String,
      unique: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    first_name: { type: String },
    last_name: { type: String },
    dob: { type: Date },
    gender: { type: String },
    educations: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Education' }],
    },
    experiences: {
      type: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Experience' }],
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
