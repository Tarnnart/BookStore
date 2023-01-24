const router = require('express').Router()
const UserController = require('../controller/user.controller')

// User
router.route('/user/registration')
  .post(UserController.createUser)

router.route('/login')
  .post(UserController.login)

module.exports = router
