const User = require('../models/user')
const jwt = require('jsonwebtoken')

exports.is_user_exist = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        res.status(204).json({ message: 'User does not exist', exist: false })

      res.status(200).json({ message: 'User exist', exist: true })
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }))
}
exports.create_user = (req, res) => {
  const user = new User(req.body)
  user
    .save()
    .then((user) => {
      if (!user) res.status(400).json({ message: 'Registration failed' })

      const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)
      res
        .status(200)
        .header('authorization', token)
        .json({ message: 'Registration successful' })
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }))
}
exports.check_credentials = (req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => {
      if (!user)
        res.status(401).json({ message: 'User doesn not exist', valid: false })

      if (user.password == req.body.password) {
        const token = jwt.sign({ id: user._id }, process.env.TOKEN_SECRET)

        res
          .status(200)
          .header('authorization', token)
          .json({ message: 'Login successful', valid: true })
      } else {
        res.status(401).json({ message: 'Invalid credentials', valid: false })
      }
    })
    .catch((err) => {
      res.status(500).json({ message: 'Server error' })
    })
}
exports.get_profile = (req, res) => {
  User.findById(req.userId)
    .select('-password')
    .populate('educations experiences')
    .then((user) => {
      // console.log(user)
      res.status(200).json({ user })
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }))
}
exports.update_profile = (req, res) => {
  User.findByIdAndUpdate(req.userId, { $set: req.body }, { new: true })
    .then((user) => {
      if (user) {
        user.educations = user.experiences = undefined
        res.status(200).json({ message: 'Updated successfully!', user })
      } else {
        res.status(400).json({ message: 'Update failed!' })
      }
    })
    .catch((err) => res.status(500).json({ message: 'Server error' }))
}
