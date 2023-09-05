const express = require("express");
const router = express.Router();
const uploadProduct = require("../middlewares/uploadProduct");
const productController = require("../controller/productController");

router
  .post("/", uploadProduct, productController.insert)
  .get("/", productController.getAll)
  .get("/search-product", productController.search)
  .get("/:id", productController.getProductById)
  .get("/users/:users_id", productController.getProductByUserId)
  .put("/:id", uploadProduct, productController.update)
  .delete("/:id", productController.delete);

module.exports = router;
