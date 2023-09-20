const Pool = require("../config/db");

const selectAllOrders = ({search, limit, offset, sort, sortby }) => {
  return Pool.query(`
  SELECT orders.*, product.product_name, product.photo_product, product.price
  FROM orders
  LEFT JOIN product ON orders.product_id = product.id
  WHERE status_orders ILIKE '%${search}%'
  ORDER BY ${sortby} ${sort} LIMIT ${limit} OFFSET ${offset}`);
};

const selectOrdersById = (seller_id) => {
  return Pool.query(`
  SELECT orders.*,product.product_name, product.photo_product, product.price, address.recipient_name, address.phone,address.address_as,address.address,address.city,address.postal_code
  FROM orders
  LEFT JOIN product ON orders.product_id = product.id
  LEFT JOIN address ON orders.address_id = address.id
  WHERE orders.seller_id='${seller_id}'`);
};

const selectCustommerById = (custommer_id) => {
  return Pool.query(`
  SELECT orders.*,product.product_name, product.photo_product, product.price, address.recipient_name, address.phone,address.address_as,address.address,address.city,address.postal_code
  FROM orders
  LEFT JOIN product ON orders.product_id = product.id
  LEFT JOIN address ON orders.address_id = address.id
  WHERE orders.custommer_id='${custommer_id}'`);
};

const selectOrdersCustommer = (custommer_id, status_orders) => {
  return Pool.query(`
  SELECT orders.*, product.product_name, product.photo_product, product.price
  FROM orders
  LEFT JOIN product ON orders.product_id = product.id
      WHERE orders.custommer_id = '${custommer_id}' AND orders.status_orders = '${status_orders}'`);
};

const selectOrdersSeller = (seller_id, status_orders) => {
  return Pool.query(`
  SELECT orders.*,product.product_name, product.photo_product, product.price, address.recipient_name, address.phone,address.address_as,address.address,address.city,address.postal_code
  FROM orders
  LEFT JOIN product ON orders.product_id = product.id
  LEFT JOIN address ON orders.address_id = address.id
      WHERE orders.seller_id = '${seller_id}' AND orders.status_orders = '${status_orders}'`);
};

const insertOrders = (data) => {
  const { id, order_size, order_color, quantity, seller_id, custommer_id,product_id } = data;
  return Pool.query(
    `INSERT INTO orders (id, order_size, order_color, quantity, seller_id, custommer_id, product_id ) VALUES('${id}', '${order_size}', '${order_color}', '${quantity}', '${seller_id}','${custommer_id}','${product_id}')`
  );
};

const updateOrders = (data) => {
  const newStatus = "get paid";
  const { id, address_id } = data;
  return Pool.query(
    `UPDATE orders SET address_id='${address_id}',status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const updateStatusGetPaid = (data) => {
  const { id } = data;
  const newStatus = "get paid";
  return Pool.query(
    `UPDATE orders SET status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const updateStatusProcessed = (data) => {
  const { id } = data;
  const newStatus = "processed";
  return Pool.query(
    `UPDATE orders SET status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const updateStatusSent = (data) => {
  const { id } = data;
  const newStatus = "sent";
  return Pool.query(
    `UPDATE orders SET status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const updateStatusCompleted = (data) => {
  const { id } = data;
  const newStatus = "completed";
  return Pool.query(
    `UPDATE orders SET status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const updateStatusCancel = (data) => {
  const { id } = data;
  const newStatus = "cancel";
  return Pool.query(
    `UPDATE orders SET status_orders='${newStatus}' WHERE id='${id}'`
  );
};

const deleteOrders = (id) => {
  return Pool.query(`DELETE FROM orders WHERE id='${id}'`);
};

const countData = () => {
  return Pool.query("SELECT COUNT(*) FROM orders");
};

const findUUID = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT orders FROM orders WHERE id='${id}'`,
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
      `SELECT orders FROM orders WHERE users_id='${users_id}'`,
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
  selectAllOrders,
  selectOrdersById,
  selectCustommerById,
  selectOrdersCustommer,
  selectOrdersSeller,
  insertOrders,
  updateOrders,
  updateStatusGetPaid,
  updateStatusProcessed,
  updateStatusSent,
  updateStatusCompleted,
  updateStatusCancel,
  deleteOrders,
  countData,
  findUUID,
  findUsersId,
};
