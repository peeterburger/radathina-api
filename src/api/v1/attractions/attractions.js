'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

router.get('/', controller.get_parameter_list);
router.get('/all', controller.get_attractions_all);
router.get('/:attr_name', controller.get_attractions_by_name);
router.get('/:c_pos_lon/:c_pos_lat/:radius', controller.get_attractions_nearby);

module.exports = router;