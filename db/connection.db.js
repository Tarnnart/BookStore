// const DbConfig = require('../../config').db
const mongoose = require('mongoose')
// const { ConnectionDB } = require('connectiondb')
// const logger = require('debug')('SERVER:sequelize')
const UserRegistration = require('../models/user.model')
const BookRegistration = require('../models/book_data.model')
const History = require('../models/history_data.model')

// Mongodb uri
async function main() {
  mongoose.connect('mongodb+srv://Tarntarn:88888888@cluster0.dwrk2tv.mongodb.net/?retryWrites=true&w=majority', { useNewUrlParser: true })
}

// Connect to database
main().catch((err) => console.log(err))
const db = mongoose.connection

db.on('error', (err) => { console.error(err) })
db.once('open', () => { console.log('DB started successfully') })

// const arrayTest = []
// arrayTest.forEach((item, index) => {
//   console.log(item, index)
// })

const User = UserRegistration()
const Book = BookRegistration()
const HistoryData = History()

module.exports = { User }
module.exports = { Book }
module.exports = { HistoryData }
