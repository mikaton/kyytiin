#!/usr/bin/env nodejs

const express = require('express'),
	dotenv = require('dotenv').config(),
	config = require('./server/config/main'),
	bodyParser = require('body-parser'),
	bcrypt = require('bcrypt'),
	router = require('./server/router'),
	models = require('./server/models'),
	winston = require('winston'),
	http = require('http'),
	cors = require('cors'),
	app = express(),
	compression = require('compression'),
	helmet = require('helmet'),
	path = require('path');
ua = require('universal-analytics');

process.env.NODE_ENV = "developement"

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

//analytiikkatyökalu
var visitor = ua('UA-117188333-1', { https: true });
visitor.pageview({dp: "/", dh: "https://kyyti.in"}).send();

models.sequelize.sync().then(() => console.log('Models synced.')).catch((err) => console.log('Error syncing models: ' + err.stack));

router(app);

//lähettää index.html:n 'dist/index.html' kansiosta, tarvitaan angularin näyttämiseksi selaimessa 
app.use(express.static(path.join(__dirname, 'dist')));
app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname, 'dist/index.html'));
});

const server = http.createServer(app);

server.listen(config.port, () => console.log(`API running on localhost:${config.port}`));


module.exports = server;