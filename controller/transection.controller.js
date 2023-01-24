const express = require('express')
const moment = require('moment')

const DateUse = moment().format()

const app = express()
app.use(express.json())

// Connect to Data models
const UserRegistration = require('../models/user.model')
const BookRegistration = require('../models/book_data.model')
const History = require('../models/history_data.model')

const arrayTest = []
arrayTest.forEach((item, index) => {
  console.log(item, index)
})

function calcDate(dateRent, dateReturn) {
  /*
  * calcDate() : Calculates the difference between two dates
  * @date1 : "First Date in the format MM-DD-YYYY"
  * @date2 : "Second Date in the format MM-DD-YYYY"
  * return : Array
  */
  // new date instance
  const DTdate1 = new Date(dateRent)
  const DTdate2 = new Date(dateReturn)

  // Get the Timestamp
  const date1TimeStamp = DTdate1.getTime()
  const date2TimeStamp = DTdate2.getTime()

  let calc

  // Check which timestamp is greater
  if (date1TimeStamp > date2TimeStamp) {
    calc = new Date(date1TimeStamp - date2TimeStamp)
  } else {
    calc = new Date(date2TimeStamp - date1TimeStamp)
  }

  // Retrieve the date, month and year
  const calcFormatTmp = `${calc.getDate()}-${calc.getMonth() + 1}-${calc.getFullYear()}`
  // Convert to an array and store
  const calcFormat = calcFormatTmp.split('-')
  // Subtract each member of our array from the default date
  const daysPassed = Number(Math.abs(calcFormat[0]) - 1)
  const monthsPassed = Number(Math.abs(calcFormat[1]) - 1)
  const yearsPassed = Number(Math.abs(calcFormat[2]) - 1970)

  // Set up custom text
  const yrsTxt = ['year', 'years']
  const mnthsTxt = ['month', 'months']
  const daysTxt = ['day', 'days']

  // Convert to days and sum together
  const totalDays = (yearsPassed * 365) + (monthsPassed * 30.417) + daysPassed
  const penalty = totalDays - 3
  const penaltySum = penalty * 20
  console.log(penaltySum)

  // display result with custom text
  const result = ((yearsPassed == 1) ? `${yearsPassed} ${yrsTxt[0]} ` : (yearsPassed > 1)
  ? `${yearsPassed} ${yrsTxt[1]} ` : '')
  + ((monthsPassed == 1) ? `${monthsPassed} ${mnthsTxt[0]}` : (monthsPassed > 1)
  ? `${monthsPassed} ${mnthsTxt[1]} ` : '')
  + ((daysPassed == 1) ? `${daysPassed} ${daysTxt[0]}` : (daysPassed > 1)
  ? `${daysPassed} ${daysTxt[1]}` : '')
  
  // return the result
  return {
    total_days: Math.round(totalDays),
    // result: result.trim(),
  }
}

// *** Path Rent ***
// Compass historydatas
app.post('/book/rent', async (req, res) => {
  console.log('req.body:', req.body)
  const {
    username,
    bookName,
  } = req.body

  const user = await UserRegistration.findOne({ username })
  const book = await BookRegistration.findOne({ bookName })

  const bookRent = await new History({
    firstname: user.firstname,
    lastname: user.lastname,
    username: user.username,
    // status: book.status,
    primaryIdBook: book.primaryIdBook,
    idBook: book.idBook,
    nameBook: book.bookName,
    dateRent: DateUse,
  }).save()

  // const updateBookData = await BookRegistration.findOneAndUpdate({ status: 'Rent' })

  return res.json(bookRent)
})

// Path Return
// Compass historydatas
app.post('/return', async (req, res) => {
  console.log('req.body:', req.body)

  // Input
  const { username } = req.body

  // Find data
  const returnDataHistory = await History.findOne({ username })

  // calcDate(dateEnd - dateEnd)
  // const DateMath1 = new dateRent
  // const DateMath2 = new dateEnd

  const CalculatesDate = calcDate(returnDataHistory.dateRent, DateUse)

  const BookReturn = await new History({
    firstname: returnDataHistory.firstname,
    lastname: returnDataHistory.lastname,
    username: returnDataHistory.username,
    primaryIdBook: returnDataHistory.primaryIdBook,
    idBook: returnDataHistory.idBook,
    nameBook: returnDataHistory.nameBook,
    dateRent: returnDataHistory.dateRent,
    dateEnd: DateUse,
    penalty: CalculatesDate.penalty,
  }).save()

  // const updateBookData = await BookRegistration.findOneAndUpdate({ status: 'Rent' })

  return res.json(BookReturn)
})
