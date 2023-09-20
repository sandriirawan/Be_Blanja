const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllSeller,
  selectSeller,
  deleteSeller,
  createSeller,
  updateSeller,
  findUUID,
  findEmail,
  countData,
} = require("../models/sellerModels");

const sellerController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await selectAllSeller({search, limit, offset, sort, sortby });
      const {
        rows: [{ count }],
      } = await countData();
      const totalData = parseInt(count);
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
        "Get Data Success",
        pagination
      );
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  getById: async (req, res) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        return res.json({ message: "ID Not Found" });
      }
      const result = await selectSeller(id);
      commonHelper.response(res, result.rows, 200, "Get Detail Success");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  register: async (req, res) => {
    try {
      const id = uuidv4();
      const {
        email,
        name,
        store_name,
        phone,
        password,
        store_description,
        photo,
      } = req.body;
      const passwordHash = bcrypt.hashSync(password);
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({ message: "Email Already Taken" });
      }
      const data = {
        id,
        name,
        store_name,
        email,
        phone,
        passwordHash,
        store_description: store_description || "",
        photo: photo || "",
      };
      const result = await createSeller(data);
      commonHelper.response(res, result.rows, 201, "Create Success");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
    }
  },

  update: async (req, res) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      const getUserId = await selectSeller(id);
      const user = getUserId.rows[0];
      const { file } = req;
      let photo = user.photo;
      if (file && file.path) {
        const result = await cloudinary.uploader.upload(file.path);
        photo = result.secure_url;
      }
      const { email, store_name, phone, store_description } = req.body;
      const data = {
        id,
        store_name: store_name || user.store_name,
        email: email || user.email,
        phone: phone || user.phone,
        store_description: store_description || user.store_description,
        photo: photo || user.photo,
      };

      updateSeller(data)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Update Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  delete: async (req, res) => {
    try {
      const id = String(req.params.id);
      const { rowCount } = await findUUID(id);
      if (!rowCount) {
        res.json({ message: "ID Not Found" });
      }
      deleteSeller(id)
        .then((result) =>
          commonHelper.response(res, result.rows, 200, "Delete Success")
        )
        .catch((err) => res.send(err));
    } catch (error) {
      console.log(error);
    }
  },

  login: async (req, res) => {
    const { email, password } = req.body;
    const {
      rows: [users],
    } = await findEmail(email);
    if (!users) {
      return res.status(400).json({ message: "Email not found" });
    }
    const isValidPassword = bcrypt.compareSync(password, users.password);
    if (!isValidPassword) {
      return res.status(401).json({ message: "Incorrect password" });
    }
    delete users.password;
    const payload = {
      email: users.email,
    };
    users.token = authHelper.generateToken(payload);
    users.refreshToken = authHelper.generateRefreshToken(payload);
    commonHelper.response(res, users, 201, "Login Successfuly");
  },

  refreshToken: (req, res) => {
    const refreshToken = req.body.refreshToken;
    const decoded = jwt.verify(refreshToken, process.env.SECRETE_KEY_JWT);
    const payload = {
      email: decoded.email,
    };
    const result = {
      token: authHelper.generateToken(payload),
      refreshToken: authHelper.generateRefreshToken(payload),
    };
    commonHelper.response(res, result, 200);
  },
};
module.exports = sellerController;
