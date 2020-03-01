require('dotenv').config({ path: './.env' });

// SERVER CONFIG
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const db = require('./db/queries');

const app = express();

app.use((bodyParser.urlencoded({extended: true})));

// root directory
app.get("/", (req, res) => {
  res.send('App is now running!');
});

app.get('/products', (req, res) => {
  db.getProducts()
    .then(prods => res.send(prods))
    .catch(err => {
      console.log('err:', err)
      res.send(err);
    });
});

app.post('/products', (req, res) => {
  console.log('req:', req.query)
  db.createProduct(req.query.name, req.query.description, req.query.go_live_date)
    .then(dbRes => res.send(dbRes))
    .catch(err => {
      if (err.code === '23505') {
        db.updateProduct(req.query.name, req.query.name, req.query.description, req.query.go_live_date)
          .then(dbRes => console.log(dbRes))
          .catch(err => console.log(err));
      }
      return res.send(err);
    });
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});