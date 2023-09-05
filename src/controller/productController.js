const { v4: uuidv4 } = require("uuid");
const createError = require("http-errors");
const commonHelper = require("../helper/common");
const Joi = require("joi");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllProduct,
  searchProduct,
  selectProductById,
  selectProductByUserId,
  insertProduct,
  updateProduct,
  deleteProduct,
  countData,
  findUUID,
} = require("../models/productModels");

const productController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const result = await selectAllProduct({
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

  search: (req, res, next) => {
    const search = req.query.search || "";
    searchProduct({ search })
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },

  getProductById: (req, res, next) => {
    const id = String(req.params.id);
    selectProductById(id)
      .then((result) =>
        commonHelper.response(res, result.rows, 200, "get data success")
      )
      .catch((err) => res.send(err));
  },
  getProductByUserId: async (req, res, next) => {
    try {
      const users_id = String(req.params.users_id);
      const result = await selectProductByUserId(users_id);
      commonHelper.response(res, result.rows, 200, "get data success");
    } catch (err) {
      res.send(err);
    }
  },

  insert: async (req, res) => {
    try {
      const {
        product_name,
        color,
        size,
        stock,
        price,
        condition,
        description,
        users_id,
        category_id,
      } = req.body;
      const id = uuidv4();
      const { file } = req;
      if (file && file.path) {
        const result = await cloudinary.uploader.upload(file.path);
        photo_product = result.secure_url;
      }

      const data = {
        id,
        product_name,
        color,
        size,
        stock,
        price,
        condition,
        description,
        photo_product,
        users_id,
        category_id,
      };
      insertProduct(data)
        .then((result) =>
          commonHelper.response(
            res,
            result.rows,
            201,
            "Berhasil Membuat Product"
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
        product_name,
        color,
        size,
        stock,
        price,
        condition,
        description,
        category_id,
      } = req.body;
      const id = String(req.params.id);
      const getData = await selectProductById(id);
      const product = getData.rows[0];

      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return next(createError(403, "ID is Not Found"));
      }

      const { file } = req;
      let photo_product = product.photo;
      if (file && file.path) {
        const result = await cloudinary.uploader.upload(file.path);
        photo_product = result.secure_url;
      }

      const data = {
        id,
        product_name: product_name || product.product_name,
        color: color || product.color,
        size: size || product.size,
        stock: stock || product.stock,
        price: price || product.price,
        condition: condition || product.condition,
        description: description || product.description,
        category_id: category_id || product.category_id,
        photo_product: photo_product || product.photo_product,
      };
      updateProduct(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Product updated")
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
      await deleteProduct(id);
      commonHelper.response(res, {}, 200, "Product deleted");
    } catch (error) {
      next(error);
    }
  },
};

module.exports = productController;
