const db = require('./poolSetup');

const getProducts = () => {
  return db.query(`
    SELECT *
    FROM products;
  `)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const createProduct = (name, description, goLiveDate) => {
  const vars = [name, description, goLiveDate];

  return db.query(`
    INSERT INTO products (name, description, go_live_date)
    VALUES ($1, $2, $3);
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const updateProduct = (oldName, newName, description, goLiveDate) => {
  const vars = [newName, description, goLiveDate, oldName];
  
  return db.query(`
    UPDATE products
    SET name = $1, description = $2, go_live_date = $3
    WHERE name = $4;
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const deleteProduct = name => {
  const vars = [name];

  return db.query(`
    DELETE FROM products 
    WHERE name = $1;
  `, vars).then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct
}