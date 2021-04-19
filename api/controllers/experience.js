const Experience = require('../models/experience')
const User = require('../models/user')

exports.create_experience = (req, res) => {
  const experience = new Experience({ ...req.body, user: req.userId })
  const newExperience = experience.save()
  const updateUser = User.updateOne(
    { _id: req.userId },
    { $push: { experiences: experience._id } }
  ).exec()

  Promise.all([newExperience, updateUser])
    .then(([experience, user]) => {
      if (!experience || user.nModified == 0) throw new Error('Action failed')

      res.status(200).json({ message: 'Action successfull', experience })
    })
    .catch((err) => {
      if (err.message == 'Action failed')
        res.status(400).json({ message: err.message })

      res.status(500).json({ message: 'Server error' })
    })
}
exports.delete_experience = (req, res) => {
  Experience.findByIdAndDelete(req.body.id)
    .then((experience) => {
      if (!experience) throw new Error('Action failed!')
      res.status(200).json({ message: 'Action successfull', experience })
    })
    .catch((err) => {
      if (err.message == 'Action failed')
        res.status(400).json({ message: err.message })

      res.status(500).json({ message: 'Server error' })
    })
}
