const router = require('express').Router()
const bcrypt = require('bcrypt')

const userRouter = require('./user.route')
const bookRouter = require('./book.route')
const transectionRouter = require('./transection.route')
const historyRouter = require('./history.route')

const rounds = 10

const jwt = require('jsonwebtoken')
const User = require('../models/user.model')

const tokenSecret = 'my-token-secret'

const middleware = require('../middlewares')
const { Book } = require('../db/connection.db')
const app = require('..')

function generateToken(user) {
  return jwt.sign({ data: user }, tokenSecret, { expiresIn: '24h' })
}

router.get('/loginxmm x', (req, res) => {
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) res.status(404).json({ error: 'no user with that email found' })
      else {
        bcrypt.compare(req.body.password, user.password, (error, match) => {
          if (error) res.status(500).json(error)
          else if (match) res.status(200).json({ token: generateToken(user) })
          else res.status(403).json({ error: 'passwords do not match' })
        })
      }
    })
    .catch((error) => {
      res.status(500).json(error)
    })
})

router.post('/signup', (req, res) => {
  bcrypt.hash(req.body.password, rounds, (error, hash) => {
    if (error) res.status(500).json(error)
    else {
      const newUser = User({ email: req.body.email, password: hash })
      newUser.save()
        .then((user) => {
          res.status(200).json({ token: generateToken(user) })
        })
        // .catch((error) => {
        //   res.status(500).json(error)
        // })
    }
  })
})

router.get('/jwt-test', middleware.verify, (req, res) => {
  res.status(200).json(req.user)
})

app.use('api/user', userRouter)
app.use('api/book', bookRouter)
app.use('api/transection', transectionRouter)
app.use('api/historyRoutter', historyRouter)
