const router = require('express').Router()
const HistoryController = require('../controller/history.controller')

// History
router.route('/user/history')
  .post(HistoryController.historyData)

module.exports = router
