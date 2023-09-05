const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middlewares/cloudinary");

const {
  selectAllBank,
  insertBank,
  deleteBank,
  countData,
  findID,
} = require("../models/bankModels");

const bankController = {
  getAllBank: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "created_at";
      const sort = req.query.sort || "ASC";
      const result = await selectAllBank({ limit, offset, sort, sortby });
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

  insert: async (req, res) => {
    const { bank_name } = req.body;
    const id = uuidv4();
    const { file } = req;
    if (file && file.path) {
      const result = await cloudinary.uploader.upload(file.path);
      photo_bank = result.secure_url;
    }
    const data = {
      id,
      bank_name,
      photo_bank,
    };
    insertBank(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "bank Success")
      )
      .catch((err) => res.send(err));
  },

  delete: async (req, res, next) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findID(id);

      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      } else {
        const result = await deleteBank(id);
        commonHelper.response(res, result.rows, 200, "Delete bank Success");
      }
    } catch (error) {
      console.log(error);
    }
  },
};

module.exports = bankController;
