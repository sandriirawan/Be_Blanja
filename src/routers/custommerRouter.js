const express = require('express')
const router = express.Router()
const custommerController = require('../controller/custommerController')
const uploadCustommer = require("../middlewares/uploadCustommer")


router
.get('/',custommerController.getAll)
.put("/:id", uploadCustommer, custommerController.update)
.get("/:id", custommerController.getById)
.post('/register', custommerController.register)
.post("/login", custommerController.login)
.delete("/:id", custommerController.delete);


module.exports = router