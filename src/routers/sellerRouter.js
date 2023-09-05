const express = require('express')
const router = express.Router()
const sellerController = require('../controller/sellerController')
const uploadCustommer = require("../middlewares/uploadCustommer")


router
.get('/',sellerController.getAll)
.put("/:id", uploadCustommer, sellerController.update)
.get("/:id", sellerController.getById)
.post('/register', sellerController.register)
.post("/login", sellerController.login)
.delete("/:id", sellerController.delete);


module.exports = router