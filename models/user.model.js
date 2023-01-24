const mongoose = require('mongoose')
const moment = require('moment')

const DateUse = moment().format()

const usersSchema = mongoose.Schema({
  firstname: { type: String, require: true },
  lastname: { type: String, require: true },
  username: { type: String, unique: true },
  password: { type: String, require: true },
  dateUserRegistration: { type: Date, default: DateUse },
})

module.exports = mongoose.model('userData', usersSchema)

// const users1 = new Book({ name: 'Introduction to Mongoose', price: 10, quantity: 25 })
// const users1 = new Book({ name: 'Introduction to Mongoose'})

// save model to database
// users1.save((err, userpass) => {
//   if (err) return console.error(err)
//   console.log(`${userpass.name} saved to collection.`)
// })
