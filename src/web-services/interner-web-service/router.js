'use strict';

const express = require('express');
const router = express.Router();
const controller = require('./_controllers/controller');

const api_router = require('./api/api');
const log_router = require('./log/log');

router.use('/log', log_router);
router.use('/api', api_router);

router.get('/', controller.get_parameter_list);

module.exports = router;