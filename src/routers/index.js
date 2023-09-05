const express = require('express')
const router = express.Router()
const custommerRouter = require('./custommerRouter')
const sellerRouter = require('./sellerRouter')
const categoryRouter = require("./categoryRouter")
const productRouter = require("./productRouter")
const orderstRouter = require("./ordersRouter")
const bankRouter = require("./bankRouter")
const deliveryRouter = require("./deliveryRouter")
const paymentRouter = require("./paymentRouter")
const addressRouter = require("./addressRouter")



router
.use('/custommer', custommerRouter)
.use('/seller', sellerRouter)
.use('/category', categoryRouter)
.use('/product', productRouter)
.use('/orders', orderstRouter)
.use('/bank', bankRouter)
.use('/delivery', deliveryRouter)
.use('/payment', paymentRouter)
.use('/address', addressRouter)


module.exports = router