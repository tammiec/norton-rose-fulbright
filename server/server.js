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
  db.getProducts().then(prods => res.send(prods));
})

app.listen(PORT, () => {
  console.log(`app running on port ${PORT}`)
});