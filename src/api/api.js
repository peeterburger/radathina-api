'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

const v1_router = require('./v1/v1');

router.use('/v1', v1_router);

router.get('/', controller.get_parameter_list);

module.exports = router;