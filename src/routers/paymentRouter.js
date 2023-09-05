const express = require('express')
const router = express.Router()
const paymentController = require('../controller/payment')



router
.post('/', paymentController.insert)
.get('/',paymentController.getAll)
.get("/:users_id", paymentController.getPaymentByUserId)
.delete("/:id", paymentController.delete);
module.exports = router