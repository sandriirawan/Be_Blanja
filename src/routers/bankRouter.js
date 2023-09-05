const express = require('express')
const router = express.Router()
const bankController = require('../controller/banKController')
const uploadBank = require("../middlewares/uploadBank")



router
.get('/',bankController.getAllBank)
.post('/',uploadBank, bankController.insert)
.delete("/:id", bankController.delete);
module.exports = router