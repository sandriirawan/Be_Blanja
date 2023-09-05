const express = require('express')
const router = express.Router()
const addressController = require('../controller/addressController')



router
.get('/',addressController.getAll)
.get('/:users_id',addressController.getAddressByUserId)
.post('/', addressController.insert)
.put('/:id', addressController.update)
.delete("/:id", addressController.delete);
module.exports = router