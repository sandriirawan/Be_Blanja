const Pool = require("../config/db");

const selectAllAddress = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT * FROM address 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectAddressByid = (id) => {
  return Pool.query(`SELECT * FROM address WHERE id = '${id}'`);
};

const selectAddressByUsersId = (users_id) => {
  return Pool.query(`SELECT * FROM address WHERE users_id = '${users_id}'`);
};

const insertAddress = (data) => {
  const {
    id,
    recipient_name,
    address_as,
    address,
    phone,
    postal_code,
    city,
    users_id,
  } = data;
  return Pool.query(
    `INSERT INTO address (id, recipient_name, address_as, address, phone, postal_code, city, users_id) VALUES('${id}', '${recipient_name}', '${address_as}', '${address}','${phone}', '${postal_code}','${city}','${users_id}')`
  );
};

const updateAddress = (data) => {
  const {
    id,
    recipient_name,
    address_as,
    address,
    phone,
    postal_code,
    city,
  } = data;
  return Pool.query(
    `UPDATE address SET recipient_name='${recipient_name}', address_as='${address_as}' ,address='${address}',phone='${phone}',postal_code='${postal_code}',city='${city}' WHERE id='${id}'`
  );
};

const deleteAddress = (id) => {
  return Pool.query(`DELETE FROM address WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM address");
};

const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT address FROM address WHERE id='${id}'`,
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

// FIND UUID
const findUsersId = (users_id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT address FROM address WHERE users_id='${users_id}'`,
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

module.exports = {
  selectAllAddress,
  selectAddressByid,
  selectAddressByUsersId,
  insertAddress,
  updateAddress,
  deleteAddress,
  countData,
  findUUID,
  findUsersId,
};
