const Pool = require("../config/db");

const selectAllBank = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM bank ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const insertBank = (data) => {
  const { id, bank_name, photo_bank } = data;
  return Pool.query(
    `INSERT INTO bank (id, bank_name, photo_bank) 
    VALUES('${id}', '${bank_name}','${photo_bank}' )`
  );
};


// DELETE Coments
const deleteBank = (id) => {
  return Pool.query(`DELETE FROM bank WHERE id='${id}'`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM Bank");
};

//
const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(`SELECT bank FROM Bank WHERE id='${id}'`, (error, result) => {
      if (!error) {
        resolve(result);
      } else {
        reject(error);
      }
    })
  );
};

module.exports = {
  selectAllBank,
  insertBank,
  deleteBank,
  countData,
  findID,
};
