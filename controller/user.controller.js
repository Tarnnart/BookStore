const userController = {}
const express = require('express')

const app = express()
app.use(express.json())

// Library
const bcrypt = require('bcryptjs')
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const { User } = require('../db/connection.db.js')
// Connect to Data models
const UserRegistration = require('../models/user.model')

userController.createUser = async (req, res) => {
    User.registration(req.body) = await (u => res.json(u))
}

userController.get = async (req, res) => {
    User.findAll() = await (users => {
        res.json(users)
    })
}

// Compare Password
const comparePassword = async (candidate, hashPassword) => {
  const isMatch = bcrypt.compareSync(candidate, hashPassword)
  return isMatch
}

// *** Path User Registrotion ***
// Compass userdatas
app.post('/user/registration', async (req, res) => {
  try {
  // *** INPUT
    console.log('req.body:', req.body)
    const {
      firstname, lastname, username, password, dateUserRegistration,
    } = req.body
    const userRegistration = await new UserRegistration({
      firstname,
      lastname,
      username,
      password,
      dateUserRegistration,
    }).save()
    return res.json('done') // Response message
  } catch (e) {
    console.log(e)
    return res.json('failed') // Response message
  }
})

// *** Path User Login ***
// Compass userdatas
app.post('/login', async (req, res) => {
  try {
  // *** INPUT
    console.log('req.body:', req.body)
    const { username, password } = req.body

    // ** Get data
    const _user = await UserRegistration.findOne({ username }).exec()

    // * Check password
    if (comparePassword(password, _user.password)) {
    // *** OUTPUT
      return res.json({ success: true, data: _user })
    }
    return res.json({
      success: false,
      message: 'Username or password is incorrect !',
    })
  } catch (e) {
    return res.json({ error: String(e) })
  }
})

module.exports = userController