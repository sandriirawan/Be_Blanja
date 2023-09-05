const Pool = require("../config/db");

const selectAllDelivery = ({ limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM delivery ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};

const insertDelivery = (data) => {
  const { id } = data;
  return Pool.query(
    `INSERT INTO delivery (id) 
      VALUES('${id}' )`
  );
};

// COUNT DATA
const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM delivery");
};

module.exports = {
  selectAllDelivery,
  countData,
  insertDelivery,
};
