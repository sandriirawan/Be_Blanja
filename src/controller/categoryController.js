const commonHelper = require("../helper/common");
const { v4: uuidv4 } = require("uuid");
const cloudinary = require("../middlewares/cloudinary");

const {
    selectAllCategory,
    selectCategory,
    insertCategory,
    deleteCategory,
    countData,
    findID,
} = require("../models/categoryModels");

const categoryController = {
  getAllCategory: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllCategory({ limit, offset, sort, sortby });
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

  getById: async (req, res) => {
    const id = String(req.params.id);
    selectCategory(id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  insert: async (req, res) => {
    const { name } = req.body;
    const id = uuidv4();
    const { file } = req;
    if (file && file.path) {
      const result = await cloudinary.uploader.upload(file.path);
      category_photo = result.secure_url;
    }
    const data = {
      id,
      name,
      category_photo,
    };
    insertCategory(data)
      .then((result) =>
        commonHelper.response(res, result.rows, 201, "category Success")
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
        const result = await deleteCategory(id);
        commonHelper.response(res, result.rows, 200, "category Success");
      }
    } catch (error) {
      console.log(error);
    }
  },
  
};

module.exports = categoryController;
