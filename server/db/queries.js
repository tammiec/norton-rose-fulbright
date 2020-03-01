const db = require('./poolSetup');

const getProducts = () => {
  return db.query(`
    SELECT *
    FROM products
  `)
    .then(res => {
      return res.rows;
    })
    .catch(error => {
      throw error;
    });
}

module.exports = {
  getProducts
}