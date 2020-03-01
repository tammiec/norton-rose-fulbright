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

const createProduct = (name, description, go_live_date) => {
  const vars = [name, description, go_live_date];

  return db.query(`
    INSERT INTO products (name, description, go_live_date)
    VALUES ($1, $2, $3)
    RETURNING *;
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const updateProduct = (oldName, newName, description, go_live_date) => {
  const vars = [newName, description, go_live_date, oldName];
  
  return db.query(`
    UPDATE products
    SET name = $1, description = $2, go_live_date = $3
    WHERE name = $4
    RETURNING *;
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
  `, vars)
    .then(res => res)
    .catch(error => {
      throw error;
    });
};

const createStartup = (email, name, description, hear_back_date, num_employees, ceo_name, referred_by) => {
  const vars = [email, name, description, hear_back_date, num_employees, ceo_name, referred_by];

  return db.query(`
    INSERT INTO startups (email, name, description, hear_back_date, num_employees, ceo_name, referred_by)
    VALUES($1, $2, $3, $4, $5, $6, $7)
    RETURNING *;
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const updateStartup = (email, name, description, hear_back_date, num_employees, ceo_name, referred_by) => {
  const vars = [email, name, description, hear_back_date, num_employees, ceo_name, referred_by];

  return db.query(`
    UPDATE startups
    SET name = $2, description = $3, hear_back_date = $4, num_employees = $5, ceo_name = $6, referred_by = $7
    WHERE email = $1
    RETURNING *;
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

const createStartupProductPair = (product_id, startup_id) => {
  const vars = [product_id, startup_id];

  return db.query(`
    INSERT INTO startups_products (product_id, startup_id)
    VALUES ($1, $2)
    RETURNING *;
  `, vars)
    .then(res => res.rows)
    .catch(error => {
      throw error;
    });
};

module.exports = {
  getProducts,
  createProduct,
  updateProduct,
  deleteProduct,
  createStartup,
  updateStartup,
  createStartupProductPair
}