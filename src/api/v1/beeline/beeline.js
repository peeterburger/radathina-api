'use strict';

const router = require('express').Router();
const controller = require('./_controller/controller')

router.get('/', controller.get_parameter_list);
router.get('/:c_pos_lon/:c_pos_lat/:t_pos_lon/:t_pos_lat', controller.calculate_beeline);

module.exports = router;