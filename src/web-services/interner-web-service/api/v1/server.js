'use strict';

const express = require('express');

const app = express();
const port = process.env.port || 3000;

app.listen(port);

console.log('RESTful API server stated on port: ' + port);