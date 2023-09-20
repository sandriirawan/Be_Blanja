const Pool = require("../config/db");

//GET ALL CUSTOMMER
const selectAllAdmin = ({ search, limit, offset, sort, sortby }) => {
  return Pool.query(
    `SELECT * FROM admin WHERE name ILIKE '%${search}%' ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`
  );
};



//POST CUSTOMMER
const createAdmin = (data) => {
  const { id, email, passwordHash, name} = data;
  const role = "admin";
  return Pool.query(
    `INSERT INTO admin (id, email, password, name,role) VALUES ('${id}','${email}','${passwordHash}','${name}','${role}')`
  );
};


//FIND EMAIL
const findEmail = (email) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT * FROM admin WHERE email= '${email}' `,
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
  return Pool.query(`SELECT COUNT(*) FROM admin`);
};

module.exports = {
  selectAllAdmin,
  createAdmin,
  findEmail,
  countData,
};
