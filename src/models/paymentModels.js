const Pool = require("../config/db");

const selectAllPayment = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT * FROM payment 
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectPayment = (users_id) => {
  return Pool.query(`SELECT * FROM payment WHERE users_id = '${users_id}'`);
};

const insertPayment = (data) => {
  const { id, users_id, bank_id,total_payment } = data;
  return Pool.query(
    `INSERT INTO payment (id, users_id, bank_id,total_payment) VALUES('${id}', '${users_id}', '${bank_id}', '${total_payment}')`
  );
};

const deletePayment = (id) => {
  return Pool.query(`DELETE FROM payment WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM payment");
};

const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT payment FROM payment WHERE id='${id}'`,
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
      `SELECT payment FROM payment WHERE users_id='${users_id}'`,
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
  selectAllPayment,
  selectPayment,
  insertPayment,
  deletePayment,
  countData,
  findUUID,
  findUsersId,
};
