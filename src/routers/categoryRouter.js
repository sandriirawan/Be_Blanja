const express = require('express')
const router = express.Router()
const categoryController = require('../controller/categoryController')
const uploadCategory = require("../middlewares/uploadCategory")



router
.get('/',categoryController.getAllCategory)
.get("/:id", categoryController.getById)
.post('/',uploadCategory, categoryController.insert)
.delete("/:id", categoryController.delete);
module.exports = router