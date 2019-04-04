'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

const logger = require('./utils/logger');

function logRequest (req, res, next) {
    logger.info(`${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
}
app.use(logRequest);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/v1/routes/routes');
routes(app);

function logError (err, req, res, next) {
    logger.error(`${err.status || 500} - ${err.message} - ${req.originalUrl} - ${req.method} - ${req.ip}`);
    next();
}
app.use(logError);

app.listen(port);

console.log('radathina web API stated on port: ' + port);