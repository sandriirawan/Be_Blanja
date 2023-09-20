const { v4: uuidv4 } = require("uuid");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const Joi = require("joi");
const authHelper = require("../helper/auth");
const commonHelper = require("../helper/common");
const cloudinary = require("../middlewares/cloudinary");
const {
  selectAllAdmin,
  createAdmin,
  findEmail,
  countData,
} = require("../models/adminModels");

const registerValidationSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(8).required(),
});

const adminController = {
  getAll: async (req, res) => {
    try {
      const page = Number(req.query.page) || 1;
      const limit = Number(req.query.limit) || 100;
      const offset = (page - 1) * limit;
      const sortby = req.query.sortby || "id";
      const sort = req.query.sort || "ASC";
      const search = req.query.search || "";
      const result = await selectAllAdmin({ search,limit, offset, sort, sortby });
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


  register: async (req, res) => {
    try {
      const id = uuidv4();
      const { email, name, password} = req.body;
      const passwordHash = bcrypt.hashSync(password);
      const { rowCount } = await findEmail(email);
      if (rowCount) {
        return res.json({ message: "Email Already Taken" });
      }

      const data = {
        id,
        name,
        email,
        passwordHash,
      };
      const result = await createAdmin(data);
      commonHelper.response(res, result.rows, 201, "Create Success");
    } catch (err) {
      console.error(err);
      res.status(500).send(err.message);
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

module.exports = adminController;
