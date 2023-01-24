const mongoose = require('mongoose')
const moment = require('moment')

const DateUse = moment().format()
const statusUser = ['Rent', 'Avaliable']

const historySchema = mongoose.Schema({
  firstname: { type: String },
  lastname: { type: String },
  username: { type: String, require: true },
  status: { type: String, enum: statusUser, default: 'Rent' },
  primaryIdBook: { type: String },
  idBook: { type: String },
  nameBook: { type: String },
  dateRent: { type: Date, require: true, default: DateUse },
  dateEnd: { type: Date },
  penalty: { type: Number, default: 0 },
})

module.exports = mongoose.model('historyData', historySchema)
