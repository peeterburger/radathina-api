'use strict';

var router = require('express').Router();

router.use('/attractions', require('./attraction.routes'));
router.use('/beeline', require('./beeline.routes'));

module.exports = router;