'use strict';

const router = require('express').Router();
const controller = require('./_controller/controller')

router.get('/', controller.get_parameter_list);
router.get('/calculate', controller.calculate_beeline);

module.exports = router;