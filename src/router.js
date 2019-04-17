'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

const api_router = require('./api/api');
const log_router = require('./log/log');
const proxy_router = require('./proxy/proxy');

router.use('/log', log_router);
router.use('/api', api_router);
router.use('/proxy', proxy_router);

router.get('/', controller.get_parameter_list);

module.exports = router;