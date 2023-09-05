const Pool = require("../config/db");

//GET ALL SELLER
const selectAllSeller = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM seller ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

//GET SELECT SELLER
const selectSeller = (id) => {
  return Pool.query(`SELECT * FROM seller WHERE id = '${id}'`);
};

//DELETE SELECT SELLER
const deleteSeller = (id) => {
  return Pool.query(`DELETE FROM seller WHERE id = '${id}'`);
};

//POST SELLER
const createSeller = (data) => {
  const {
    id,
    name,
    email,
    passwordHash,
    store_name,
    phone,
    store_description,
    photo,
  } = data;
  const role = "seller";
  return Pool.query(
    `INSERT INTO seller (id, name, email, password, store_name, phone, store_description, photo,role) VALUES ('${id}', '${name}', '${email}', '${passwordHash}', '${store_name}', '${phone}', '${store_description}', '${photo}', '${role}')`
  );
};

//PUT SELECT SELLER
const updateSeller = (data) => {
  const { id, email, store_name, phone, store_description, photo } = data;

  return Pool.query(
    `UPDATE seller SET email='${email}',  phone ='${phone}', store_name ='${store_name}',  store_description ='${store_description}', photo ='${photo}' WHERE id = '${id}'`
  );
};

//FIND ID
const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT * FROM seller WHERE id= '${id}' `, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

//FIND EMAIL
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM seller WHERE email= '${email}' `,
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
  return Pool.query(`SELECT COUNT(*) FROM seller`);
};

module.exports = {
  selectAllSeller,
  selectSeller,
  deleteSeller,
  createSeller,
  updateSeller,
  findUUID,
  findEmail,
  countData,
};
