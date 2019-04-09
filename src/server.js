'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const logger = require('./utils/logger');

const root_router = require('./router');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use('/', root_router);

app.use(logRequest);
app.use(logError);

app.listen(port);

console.log('radathina web API stated on port: ' + port);

function logRequest(req, res, next) {
    logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
};

function logError(err, req, res, next) {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
};