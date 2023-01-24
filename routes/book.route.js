const router = require('express').Router()
const BookController = require('../controller/book.controller')

// Book
router.route('/book/registration')
  .post(BookController.createBook)

router.route('/book/data')
  .post(BookController.bookData)

module.exports = router
