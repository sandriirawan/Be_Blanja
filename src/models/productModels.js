const Pool = require("../config/db");

const selectAllProduct = ({ limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT product.*, seller.store_name
  FROM product
  LEFT JOIN seller ON product.users_id = seller.id
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const searchProduct = ({ search }) => {
  return Pool.query(`
    SELECT *
    FROM product WHERE product_name ILIKE '%${search}%'
   `);
};

const selectProductById = (id) => {
  return Pool.query(`
  SELECT product.*, seller.store_name
  FROM product
  LEFT JOIN seller ON product.users_id = seller.id
  WHERE product.id='${id}'`);
};

const selectProductByUserId = (users_id) => {
  return Pool.query(`
    SELECT product.*, seller.store_name
    FROM product
    LEFT JOIN seller ON product.users_id = seller.id
    WHERE product.users_id = '${users_id}'`);
};

const insertProduct = (data) => {
  const {
    id,
    product_name,
    color,
    size,
    stock,
    price,
    condition,
    description,
    photo_product,
    users_id,
    category_id,
  } = data;
  return Pool.query(
    `INSERT INTO product (id, product_name, color, size, stock, price, condition, description,photo_product,users_id ,category_id ) VALUES('${id}', '${product_name}', '${color}', '${size}','${stock}', '${price}','${condition}','${description}','${photo_product}','${users_id}','${category_id}')`
  );
};

const updateProduct = (data) => {
  const {
    id,
    product_name,
    color,
    size,
    stock,
    price,
    condition,
    description,
    category_id,
    photo_product,
  } = data;
  return Pool.query(
    `UPDATE product SET product_name='${product_name}', color='${color}' ,size='${size}',stock='${stock}',price='${price}',condition='${condition}',description='${description}',category_id='${category_id}',photo_product='${photo_product}' WHERE id='${id}'`
  );
};

const updateStock = (data) => {
  const { id, stock } = data;
  return Pool.query(`UPDATE product SET stock='${stock}' WHERE id='${id}'`);
};

const deleteProduct = (id) => {
  return Pool.query(`DELETE FROM product WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM product");
};

const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT product FROM product WHERE id='${id}'`,
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
      `SELECT product FROM product WHERE users_id='${users_id}'`,
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
  selectAllProduct,
  searchProduct,
  selectProductById,
  selectProductByUserId,
  insertProduct,
  updateStock,
  updateProduct,
  deleteProduct,
  countData,
  findUUID,
  findUsersId,
};
