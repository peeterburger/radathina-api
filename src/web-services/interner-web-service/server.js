'use strict';

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.port || 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.use(function(req, res) {
    res.status(404).send({url: req.originalUrl + ' not found'})
});

const routes = require('./api/v1/routes/routes');
routes(app);

app.listen(port);

console.log('RESTful API server stated on port: ' + port);