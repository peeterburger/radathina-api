'use strict';

const router = require('express').Router();

const controller_root = require('./_controllers/controller_root');
const controller_beeline = require('./_controllers/controller_beeline');
const controller_attractions = require('./_controllers/controller_attractions');

router.get('/', controller_root.root);
router.get('/attractions', controller_attractions.get_attractions_all);
router.get('/attractions/:attr_name', controller_attractions.get_attractions_by_name);
router.get('/attractions/:c_pos_lon/:c_pos_lat/:radius', controller_attractions.get_attractions_nearby);
router.get('/beeline/:c_pos_lon/:c_pos_lat/:t_pos_lon/:t_pos_lat', controller_beeline.calculate_beeline);

module.exports = router;