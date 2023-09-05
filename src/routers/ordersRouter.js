const express = require("express");
const router = express.Router();
const ordersController = require("../controller/ordersController");

router
  .get("/", ordersController.getAll)
  .get("/:seller_id", ordersController.getOrderById)
  .get("/custommer/:custommer_id", ordersController.getOrderCustommerById)
  .get("/custommer/:custommer_id/:status_orders", ordersController.getStatusCustommer)
  .get("/seller/:seller_id/:status_orders", ordersController.getStatusSeller)
  .put("/:id/processed", ordersController.updateStatusProcessed)
  .put("/:id/sent", ordersController.updateStatusSent)
  .put("/:id/completed", ordersController.updateStatusCompleted)
  .put("/:id/cancel", ordersController.updateOrderCancel)
  .post("/", ordersController.insert)
  .put("/:id", ordersController.update)
  .delete("/:id", ordersController.delete);

module.exports = router;
