'use strict';

const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const server = require('http').Server(app);

const constants = require('./app/config/constants')

const mongodb_host = constants.DEFAULT_MONGODB_HOST;
const mongodb_port = constants.DEFAULT_MONGODB_PORT;
const mongodb_database = constants.DEFAULT_MONGODB_DATABSE;

mongoose.connect(`mongodb://${mongodb_host}:${mongodb_port}/${mongodb_database}`,
	{useNewUrlParser: true});

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));

app.use('/', require('./app/routes'));

const server_port = process.env.PORT || constants.DEFAULT_SERVER_PORT;
const server_ip = process.env.IP || constants.DEFAULT_SERVER_IP;

server.listen(server_port, server_ip, function() {
	const addr = server.address();
	console.log("Server listening at", addr.address + ":" + addr.port);
});