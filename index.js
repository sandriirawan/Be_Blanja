//REQUIRE
const express = require("express");
require("dotenv").config();
const cors = require("cors");
const app = express();
const xss = require("xss-clean");
const mainRouter = require("./src/routers/index");
const createError = require("http-errors");

//APP.USE
app.use(express.json());
app.use(cors());
app.use(xss());
app.use(express.static("upload"));

//PORT
const port = 5000;

//EXECUTE
app.use("/", mainRouter);
app.all("*", (req, res, next) => {
  next(new createError.NotFound());
});

app.use((err, req, res, next) => {
  const messageError = err.message || "internal server error";
  const statusCode = err.status || 500;

  res.status(statusCode).json({
    message: messageError,
  });
});

app.listen(port, () => {
  console.log(`http://localhost:${port}`);
});
