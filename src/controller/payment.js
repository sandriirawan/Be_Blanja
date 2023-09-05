const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const {
  selectAllPayment,
  selectPayment,
  insertPayment,
  deletePayment,
  countData,
  findUUID,
  findUsersId,
} = require("../models/paymentModels");
const { updateStatusGetPaid } = require("../models/ordersModels");

const paymentController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllPayment({
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

  getPaymentByUserId: async (req, res, next) => {
    try {
      const users_id = String(req.params.users_id);
      const result = await selectPayment(users_id);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (err) {
      res.send(err);
    }
  },

  insert: async (req, res) => {
    try {
      const { users_id, bank_id,total_payment } = req.body;
      const id = uuidv4();
      const data = {
        id,
        users_id,
        bank_id,
        total_payment,
      };
      const result = await insertPayment(data);
      await updateStatusGetPaid(users_id);

      commonHelper.response(res, result.rows, 201, "Berhasil payment");
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  delete: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }
      await deletePayment(id);
      commonHelper.response(res, {}, 200, "Transaction deleted");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = paymentController;
