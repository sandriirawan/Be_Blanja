const express = require('express')
const router = express.Router()
const deliveryController = require('../controller/deliveryController')
const uploadBank = require("../middlewares/uploadBank")



router
.get('/',deliveryController.getAll)
.post('/delivery', deliveryController.insertDelivery)
module.exports = router