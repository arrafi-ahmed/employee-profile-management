const router = require('express').Router()
const educationController = require('../controllers/education')
const authToken = require('../middlewares/auth-token')

router.post('/createEducation', authToken, educationController.create_education)
router.post('/deleteEducation', authToken, educationController.delete_education)

module.exports = router
