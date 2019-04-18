'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

router.get('/', controller.get_parameter_list);
router.get('/info', controller.get_log_info);
router.get('/error', controller.get_log_error);

module.exports = router;