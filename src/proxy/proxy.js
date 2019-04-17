'use strict';

const router = require('express').Router();
const controller = require('./_controllers/controller');

router.get('/', controller.proxy);

module.exports = router;