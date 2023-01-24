const router = require('express').Router()
const TransectionController = require('../controller/transection.controller')

// Transection
router.route('/book/rent')
  .post(TransectionController.bookRent)

router.route('/return')
  .post(TransectionController.bookReturn)

module.exports = router
