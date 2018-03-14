#!/usr/bin/env nodejs

const express = require('express'),
	config = require('./server/config/main'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt'),
	router = require('./server/router'),
	models = require('./server/models'),
	Sequelize = require('sequelize'),
	sequelize = new Sequelize('mysql://root@localhost:3306/kyyti'),
	http = require('http'),
	cors = require('cors'),
	app = express(),
	compression = require('compression'),
	helmet = require('helmet'),
	path = require('path');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cors());

models.sequelize.authenticate().then(() => {
	console.log('DB Connected');
});

router(app);

//lähettää index.html:n 'dist/index.html' kansiosta, tarvitaan angularin näyttämiseksi selaimessa 
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

server.listen(config.port, () => console.log(`API running on localhost:${config.port}`));


module.exports = server;