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
  console.log('submit form req:', req.query);
  const { email, name, description, hear_back_date, num_employees, ceo_name, referred_by, product_ids } = req.query;
  db.createStartup(email, name, description, hear_back_date, num_employees, ceo_name, referred_by)
    .then(startup => {
      for (let id of product_ids) {
        db.createStartupProductPair(id, startup.id)
          .then(pair => console.log(pair[0]))
          .catch(err => console.log(err));
      }
      res.send(startup[0])
    })
    .catch(err => {
      if (err.code === '23505') {
        db.updateStartup(email, name, description, hear_back_date, num_employees, ceo_name, referred_by)
          .then(updated => {
            for (let id of product_ids) {
              db.createStartupProductPair(id, startup.id)
                .then(pair => console.log(pair[0]))
                .catch(err => console.log(err));
            }
            res.send(updated[0])
          })
          .catch(err => res.send(err));
      } else {
        console.log(err);
      }
    });
});

// PRODUCT ROUTES
app.get('/products', (req, res) => {
  db.getProducts()
    .then(prods => res.send(prods))
    .catch(err => {
      console.log('err:', err)
      res.send(err);
    });
});

app.post('/products', (req, res) => {
  console.log('product req:', req.query);
  db.createProduct(req.query.name, req.query.description, req.query.go_live_date)
    .then(product => res.send(product[0]))
    .catch(err => {
      if (err.code === '23505') {
        db.updateProduct(req.query.name, req.query.name, req.query.description, req.query.go_live_date)
          .then(updated => res.send(updated[0]))
          .catch(err => {
            console.log('err:', err);
            res.send(err);
          });
      } else {
        console.log(err);
      }
    });
});

app.delete('/products/:name', (req, res) => {
  db.deleteProduct(req.params.name)
    .then(dbRes => res.send(dbRes))
    .catch(err => res.send(err));
});

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});