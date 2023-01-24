const express = require('express')

const app = express()
app.use(express.json())

// Library
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

// Connect to Data models
const History = require('../models/history_data.model')

// Compare History
const compareฺHistory = async (candidate, hashPassword) => {
  const isMatch = bcrypt.compareSync(candidate, hashPassword)
  return isMatch
}

// Path History
app.post('/user/history', async (req, res) => {
  try {
    console.log('req.body:', req.body)
    const {
      firstname,
      lastname,
      username,
      status,
      primaryIdBook,
      idBook,
      nameBook,
      dateRent,
      dateEnd,
      penalty,
    } = req.body

    // ** Get data
    const _bookHistory = await History.find({
      firstname,
      lastname,
      username,
      status,
      primaryIdBook,
      idBook,
      nameBook,
      dateRent,
      dateEnd,
      penalty,
    }).exec()
    // * Check Book
    if (compareฺHistory(username, _bookHistory.username)) {
      // *** OUTPUT
      return res.json({ success: true, data: _bookHistory })
    //  con
    }
    return res.json({
      success: false,
      message: 'ID Book or Book Name is incorrect !',
    })
  } catch (e) {
    return res.json({ error: String(e) })
  }
})
