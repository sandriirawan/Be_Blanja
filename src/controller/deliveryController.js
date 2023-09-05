const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");

const {
  selectAllDelivery,
  insertDelivery,
  countData,
} = require("../models/deliveryModels");

const deliveryController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllDelivery({ limit, offset, sort, sortby });
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

  insertDelivery: async (req, res) => {
    const id = uuidv4();
    const data = {
      id,
    };
    insertDelivery(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "Like Success")
      )
      .catch((err) => res.send(err));
  },
};

module.exports = deliveryController;
