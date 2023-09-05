const Pool = require("../config/db");

//GET ALL CUSTOMMER
const selectAllCustommer = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM custommer ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

//GET SELECT CUSTOMMER
const selectCustommer = (id) => {
  return Pool.query(`SELECT * FROM custommer WHERE id = '${id}'`);
};

//DELETE SELECT CUSTOMMER
const deleteCustommer = (id) => {
  return Pool.query(`DELETE FROM custommer WHERE id = '${id}'`);
};

//POST CUSTOMMER
const createCustommer = (data) => {
  const { id, email, passwordHash, name, phone, gender, photo } = data;
  const role = "custommer";
  return Pool.query(
    `INSERT INTO custommer (id, email, password, name, phone, gender, photo,role) VALUES ('${id}','${email}','${passwordHash}','${name}','${phone}','${gender}','${photo}','${role}')`
  );
};

//PUT SELECT CUSTOMMER
const updateCustommer = (data) => {
  const { id, email, name, phone, photo } = data;
  return Pool.query(
    `UPDATE custommer SET email='${email}', name ='${name}', phone ='${phone}',  photo ='${photo}' WHERE id = '${id}'`
  );
};

//FIND ID
const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM custommer WHERE id= '${id}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//FIND EMAIL
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM custommer WHERE email= '${email}' `,
      (error, result) => {
        if (!error) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    )
  );
};

//COUNT DATA
const countData = () => {
  return Pool.query(`SELECT COUNT(*) FROM custommer`);
};

module.exports = {
  selectAllCustommer,
  selectCustommer,
  deleteCustommer,
  createCustommer,
  updateCustommer,
  findUUID,
  findEmail,
  countData,
};
