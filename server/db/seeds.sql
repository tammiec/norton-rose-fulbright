INSERT INTO startups (email, name, description, hear_back_date)
VALUES ('a@a.com', 'A Company', 'dkfjsljflsdjflsk', '2020-05-01'),
('b@b.com', 'B Company', 'dkfjsljflsdjflsk', '2020-05-01'),
('c@c.com', 'C Company', 'dkfjsljflsdjflsk', '2020-05-01');

INSERT INTO products (name, description, go_live_date)
VALUES ('Credit Cards', 'PPBC offers many credit card products to help your business go into debt quickly.', '2020-02-04'),
('Checking Accounts', 'PPBC offers many checking accounts that charge you feeds for every type of transaction.', '2019-11-11');

INSERT INTO startups_products (product_id, startup_id)
VALUES(1, 1),
(1, 2),
(2, 1);