DROP TABLE IF EXISTS startups_products;
DROP TABLE IF EXISTS startups CASCADE;
DROP TABLE IF EXISTS products CASCADE;

CREATE TABLE startups (
  id SERIAL PRIMARY KEY NOT NULL,
  email TEXT NOT NULL UNIQUE,
  name TEXT NOT NULL,
  description TEXT NOT NULL,
  hear_back_date DATE NOT NULL CHECK (hear_back_date > now()),
  num_employees INTEGER,
  ceo_name TEXT,
  referred_by TEXT
);

CREATE TABLE products (
  id SERIAL PRIMARY KEY NOT NULL,
  name TEXT NOT NULL UNIQUE,
  description TEXT NOT NULL,
  go_live_date DATE NOT NULL,
  logo TEXT
);

CREATE TABLE startups_products (
  product_id INTEGER REFERENCES products(id) ON DELETE CASCADE NOT NULL,
  startup_id INTEGER REFERENCES startups(id) ON DELETE CASCADE NOT NULL,
  UNIQUE (product_id, startup_id)
);