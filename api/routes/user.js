const router = require('express').Router()
const userController = require('../controllers/user')
const authToken = require('../middlewares/auth-token')

router.post('/isUserExist', userController.is_user_exist)
router.post('/createUser', userController.create_user)
router.post('/checkCredentials', userController.check_credentials)
router.post('/getProfile', authToken, userController.get_profile)
router.post('/updateProfile', authToken, userController.update_profile)

module.exports = router
