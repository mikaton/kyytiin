

INSERT INTO Customers(customer_id, firstname, lastname, email, password, phonenumber) VALUES 
(1,'Deadrising 4', 'ensimm�inen', 'email@email.email', 'kakka', '1234567'),
(2,'toinen', 'toinen', '2email@email.email', 'kakka', '21234567'),
(3, 'kolmas', 'sukunimi', 's�hk�postiosoite', 'jeesus', '123f1231');

INSERT INTO Cars(car, brand, model, color) VALUES 
('123-ABC', 'Kia', 'Ceed', 'Punainen'),
('111-ABC', 'Merc', '124w', 'Punainen'),
('222-ABC', 'Saab', '900', 'Punainen'),
('333-ABC', 'Batmobil', '9000', 'Musta');

INSERT INTO CustomersCars(customer_id, car) VALUES
(1, '123-ABC'),
(2, '222-ABC'),
(2, '333-ABC'),
(2, '111-ABC');

INSERT INTO Rides(ride_id, customer_id, startingplace, destination, time_of_departure, alternate_time_of_departure, free_seats, smoking, pets, hidden) VALUES
(1, 1, 'jeesuksenm�ki', 'golgata', "2011-03-11", "2011-03-12", 4, 1, 1, 0),
(2, 1, '�ljypuu', 'r�s�inen risti', "2015-04-12", "2014-04-13", 2, 0, 0, 0),
(3, 2, 'munam�ki', 'myyrm�ki', "2011-03-12 13:00:00", "2011-03-12 14:00:00", 4, 1, 1, 0),
(4, 2, 'asdasd', 'asdasdasdadsa', "2017-03-12 16:00:00", "2017-03-12 18:00:00", 4, 1, 1, 0);


INSERT INTO Reviews(review_id, customer_id, stars, review_text) VALUES
(1, 1, 5, 'paska j�tk� mutta ei piereskelly'),
(2, 1, 3, 'nauloja k�mmeniss� ja jalkap�ydiss�');

INSERT INTO CustomersRides_ride(customer_id, ride_id, price, provision) VALUES
(1, 1, 500, 400),
(1, 2, 1000, 100);