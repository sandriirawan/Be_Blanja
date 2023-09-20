const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllOrders,
  selectOrdersById,
  selectCustommerById,
  selectOrdersCustommer,
  selectOrdersSeller,
  insertOrders,
  updateOrders,
  updateStatusGetPaid,
  updateStatusProcessed,
  updateStatusSent,
  updateStatusCompleted,
  updateStatusCancel,
  deleteOrders,
  countData,
  findUUID,
  findUsersId,
} = require("../models/ordersModels");

const ordersController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await selectAllOrders({
        search,
        limit,
        offset,
        sort,
        sortby,
      });
      const {
        rows: [count],
      } = await countData();
      const totalData = parseInt(count.count);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit: limit,
        totalData: totalData,
        totalPage: totalPage,
      };

      commonHelper.response(
        res,
        result.rows,
        200,
        "get data success",
        pagination
      );
    } catch (error) {
      console.log(error);
    }
  },

  getOrderById: (req, res, next) => {
    const seller_id = String(req.params.seller_id);
    selectOrdersById(seller_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },
  getOrderCustommerById: (req, res, next) => {
    const custommer_id = String(req.params.custommer_id);
    selectCustommerById(custommer_id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  getStatusCustommer: async (req, res, next) => {
    try {
      const custommer_id = String(req.params.custommer_id);
      const status_orders = String(req.params.status_orders);
      const result = await selectOrdersCustommer(custommer_id, status_orders);
      if (result.rows.length === 0) {
        return commonHelper.response(res, [], 404, "No pending orders found");
      }
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (err) {
      res.send(err);
    }
  },

  getStatusSeller: async (req, res, next) => {
    try {
      const seller_id = String(req.params.seller_id);
      const status_orders = String(req.params.status_orders);
      const result = await selectOrdersSeller(seller_id, status_orders);
      if (result.rows.length === 0) {
        return commonHelper.response(res, [], 404, "No pending orders found");
      }
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (err) {
      res.send(err);
    }
  },


  updateStatusGetPaid: async (req, res, next) => {
    const users_id = String(req.params.users_id);
    const { rowCount } = await findUsersId(users_id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    updateStatusGetPaid({ users_id })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "update status success")
      )
      .catch((err) => res.send(err));
  },

  updateStatusProcessed: async (req, res, next) => {
    const id = String(req.params.id);
    const { rowCount } = await findUUID(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    updateStatusProcessed({ id })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "update status success")
      )
      .catch((err) => res.send(err));
  },

  updateStatusSent: async (req, res, next) => {
    const id = String(req.params.id);
    const { rowCount } = await findUUID(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    updateStatusSent({ id })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "update status success")
      )
      .catch((err) => res.send(err));
  },

  updateStatusCompleted: async (req, res, next) => {
    const id = String(req.params.id);
    const { rowCount } = await findUUID(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    updateStatusCompleted({ id })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "update status success")
      )
      .catch((err) => res.send(err));
  },

  updateOrderCancel: async (req, res, next) => {
    const id = String(req.params.id);
    const { rowCount } = await findUUID(id);
    if (!rowCount) {
      return next(createError(403, "ID is Not Found"));
    }
    updateStatusCancel({ id })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "update status success")
      )
      .catch((err) => res.send(err));
  },

  insert: async (req, res) => {
    try {
      const {
        order_size,
        order_color,
        quantity,
        seller_id,
        custommer_id,
        product_id,
      } = req.body;
      const id = uuidv4();

      const data = {
        id,
        order_size,
        order_color,
        quantity,
        seller_id,
        custommer_id,
        product_id,
      };
      insertOrders(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "Create Order Successfuly"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  update: async (req, res,next) => {
    try {
      const { address_id } = req.body;
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      const data = {
        id,
        address_id,
      };
      updateOrders(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Order updated")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deleteOrders(id);
      commonHelper.response(res, {}, 200, "Order deleted");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = ordersController;
