require('dotenv').config({ path: './.env' });

// SERVER CONFIG
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 8000;
const db = require('./db/queries');

const app = express();

app.use((bodyParser.urlencoded({extended: true})));

// root directory
app.get('/', (req, res) => {
  res.send('App is now running!');
});

// FORM SUBMISSION ROUTES
app.get('/submit', (req, res) => {
  res.send('Form submitted successfully, thank you!');
});

app.post('/submit', (req, res) => {
  const { email, name, description, hear_back_date, num_employees, ceo_name, referred_by, product_ids } = req.query;

  db.createStartup(email, name, description, hear_back_date, num_employees, ceo_name, referred_by)
    .then(startup => {
      for (let id of product_ids.split(',')) {
        db.createStartupProductPair(id, startup[0].id)
          .then(pair => console.log(pair[0]))
          .catch(err => console.log(err));
      }
      res.send(startup[0]);
    })
    .catch(err => {
      if (err.code == '23505') { // if email exists already, update startup instead 
        db.updateStartup(email, name, description, hear_back_date, num_employees, ceo_name, referred_by)
          .then(updated => {
            for (let id of product_ids.split(',')) {
              db.createStartupProductPair(id, updated[0].id)
                .then(pair => console.log(pair[0]))
                .catch(err => console.log(err));
            }
            res.send(updated[0]);
          })
          .catch(err => console.log(err));
      } else {
        console.log(err);
      }
    });
});

// PRODUCT ROUTES
app.get('/products', (req, res) => {
  db.getProducts()
    .then(prods => res.send(prods))
    .catch(err => console.log('err:', err));
});

app.post('/products', (req, res) => {
  db.createProduct(req.query.name, req.query.description, req.query.go_live_date)
    .then(product => res.send(product[0]))
    .catch(err => {
      if (err.code == '23505') { // if name exists, update the product instead
        db.updateProduct(req.query.name, req.query.name, req.query.description, req.query.go_live_date)
          .then(updated => res.send(updated[0]))
          .catch(err => console.log('err:', err));
      } else {
        console.log(err);
      }
    });
});

app.put('/products', (req, res) => {
  db.updateProduct(req.query.oldName, req.query.newName, req.query.description, req.query.go_live_date)
    .then(product => res.send(product[0]))
    .catch(err => {
      console.log(err);
    })
});

app.delete('/products/:name', (req, res) => {
  db.deleteProduct(req.params.name)
    .then(dbRes => res.send(dbRes))
    .catch(err => console.log(err));
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});