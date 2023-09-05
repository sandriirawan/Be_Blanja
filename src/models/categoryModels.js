const Pool = require("../config/db");

const selectAllCategory = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM category ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const selectCategory = (id) => {
  return Pool.query(`
  SELECT * FROM category WHERE id = '${id}'
  `);
};

// INSERT Coments
const insertCategory = (data) => {
  const { id, name,category_photo } = data;
  return Pool.query(
    `INSERT INTO category (id, name, category_photo) 
    VALUES('${id}', '${name}','${category_photo}' )`
  );
};

// DELETE Coments
const deleteCategory = (id) => {
  return Pool.query(`DELETE FROM category WHERE id='${id}'`);
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM category");
};

//
const findID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT category FROM category WHERE id='${id}'`,
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
  selectAllCategory,
  selectCategory,
  insertCategory,
  deleteCategory,
  countData,
  findID,
};
