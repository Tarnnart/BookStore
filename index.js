const express = require('express')

const app = express()
app.use(express.json())

// Library
const bodyParser = require('body-parser')

app.use(bodyParser.json())

const Router = require('./routes/auth')

// Localhost 8080
app.listen(8080, () => { console.log('Server started: 8080') })

// app.post('/user/registration', async (req, res) => {})

module.exports = app
