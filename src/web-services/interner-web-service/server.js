'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const {transports, createLogger, format} = require('winston');

const app = express();
const port = process.env.port || 3000;

const logger = createLogger({
    format: format.combine(
        format.timestamp(),
        format.json()
    ),
    transports: [
        new transports.Console()
    ]
})

function logRequest(req, res, next) {
    logger.info(req.url);
    next();
}

function logError (err, req, res, next) {
    logger.error(err);
    next();
}

app.use(logRequest);
app.use(logError);

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const routes = require('./api/v1/routes/routes');
routes(app);

app.listen(port);

console.log('RESTful API server stated on port: ' + port);