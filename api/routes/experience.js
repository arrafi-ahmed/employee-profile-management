const router = require('express').Router()
const experienceController = require('../controllers/experience')
const authToken = require('../middlewares/auth-token')

router.post(
  '/createExperience',
  authToken,
  experienceController.create_experience
)
router.post(
  '/deleteExperience',
  authToken,
  experienceController.delete_experience
)

module.exports = router
