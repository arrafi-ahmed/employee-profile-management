const Education = require('../models/education')
const User = require('../models/user')

exports.create_education = (req, res) => {
  const education = new Education({ ...req.body, user: req.userId })
  const newEducation = education.save()
  const updateUser = User.updateOne(
    { _id: req.userId },
    { $push: { educations: education._id } }
  ).exec()

  Promise.all([newEducation, updateUser])
    .then(([education, user]) => {
      if (!education || user.nModified == 0) throw new Error('Action failed!')

      res.status(200).json({ message: 'Action successfull', education })
    })
    .catch((err) => {
      if (err.message == 'Action failed')
        res.status(400).json({ message: err.message })

      res.status(500).json({ message: 'Server error' })
    })
}
exports.delete_education = (req, res) => {
  Education.findByIdAndDelete(req.body.id)
    .then((education) => {
      if (!education) throw new Error('Action failed!')
      res.status(200).json({ message: 'Action successfull', education })
    })
    .catch((err) => {
      if (err.message == 'Action failed')
        res.status(400).json({ message: err.message })

      res.status(500).json({ message: 'Server error' })
    })
}
