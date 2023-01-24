const express = require('express')
// const mongoose = require('mongoose')
// const moment = require('moment')

// const DateUse = moment().format()

const app = express()
app.use(express.json())

// Library
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())
const BookRegistration = require('../models/book_data.model')

// Compare Book
const compareฺBook = async (candidate, hashBook) => {
  const isMatch = bcrypt.compareSync(candidate, hashBook)
  return isMatch
}

// *** Path Book Registration ***
app.post('/book/registration', async (req, res) => {
  try {
    // *** INPUT
    console.log('req.body:', req.body)
    const {
      primaryIdBook,
      idBook,
      bookName,
      dateRegistration,
      writer,
      publisher,
      catagory,
      status,
      totalBook,
    } = req.body

    const bookRegistration = await new BookRegistration({
      primaryIdBook,
      idBook,
      bookName,
      dateRegistration,
      writer,
      publisher,
      catagory,
      status,
      totalBook,
    }).save()
    return res.json('done') // Response message
  } catch (e) {
    console.log(e)
    return res.json('failed') // Response message
  }
})

// *** Path Book History ***
app.post('/book/data', async (req, res) => {
  try {
    // *** INPUT
    console.log('req.body:', req.body)
    const {
      primaryIdBook,
    } = req.body

    // ** Get data
    const _bookData = await BookRegistration.find({
      primaryIdBook,
    }).exec()

    // * Check Book
    if (compareฺBook(primaryIdBook, _bookData.primaryIdBook)) {
      // *** OUTPUT
      return res.json({ success: true, data: _bookData })
    }
    return res.json({
      success: false,
      message: 'ID Book or Book Name is incorrect !',
    })
  } catch (e) {
    return res.json({ error: String(e) })
  }
})
