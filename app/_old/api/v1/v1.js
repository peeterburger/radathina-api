'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

const attractions_router = require('./attractions/attractions');
const beeline_router = require('./beeline/beeline');

router.use('/attractions', attractions_router);
router.use('/beeline', beeline_router);

router.get('/', controller.get_parameter_list);

module.exports = router;