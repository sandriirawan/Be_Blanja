const express = require('express')
const router = express.Router()
const adminController = require('../controller/adminController')


router
.get('/',adminController.getAll)
.post('/register', adminController.register)
.post("/login", adminController.login)


module.exports = router