const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const {
  selectAllAddress,
  selectAddressByid,
  selectAddressByUsersId,
  insertAddress,
  updateAddress,
  deleteAddress,
  countData,
  findUUID,
  findUsersId,
} = require("../models/addressModels");

const addressController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllAddress({
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

  getAddressByUserId: async (req, res, next) => {
    try {
      const users_id = String(req.params.users_id);
      const result = await selectAddressByUsersId(users_id);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (err) {
      res.send(err);
    }
  },

  insert: async (req, res) => {
    try {
      const {
        recipient_name,
        address_as,
        address,
        phone,
        postal_code,
        city,
        users_id,
      } = req.body;
      const id = uuidv4();
      const { rowCount } = await findUsersId(users_id);
      if (rowCount) {
        return res.json({ message: "User already has an address"});
      }
      const data = {
        id,
        recipient_name,
        address_as,
        address,
        phone,
        postal_code,
        city,
        users_id,
      };
      insertAddress(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "Create Address Successfuly"
          )
        )
        .catch((err) => res.send(err));
    } catch (error) {
      res.status(500).send(error.message);
    }
  },

  update: async (req, res) => {
    try {
      const {
        recipient_name,
        address_as,
        address,
        phone,
        postal_code,
        city,
      } = req.body;
      const id = String(req.params.id);
      const getData = await selectAddressByid(id);
      const dataAddress = getData.rows[0];

      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }

      const data = {
        id,
        recipient_name: recipient_name || dataAddress.recipient_name,
        address_as: address_as || dataAddress.address_as,
        address: address || dataAddress.address,
        phone: phone || dataAddress.phone,
        postal_code: postal_code || dataAddress.postal_code,
        city: city || dataAddress.city,
      };
      updateAddress(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Address updated")
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
      await deleteAddress(id);
      commonHelper.response(res, {}, 200, "Address deleted");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = addressController;
