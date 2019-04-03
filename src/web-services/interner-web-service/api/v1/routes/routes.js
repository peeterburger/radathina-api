'use strict';

const express = require('express');
const router = express.Router();

router.use(function timeLog(req, res, next) {
    console.log('Time: ', Date.now());
    next();
});

// define the home page route
router.get('/', function(req, res) {
    res.send('Home');
});

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/attractions')
        .get(controller.list_all_attractions)
        .post()

    app.route('/attractions/:attr_name')
        .get(controller.list_attractions_by_name)
        .delete(controller.delete_attraction_by_name);

    app.route('/attractions/:current_position_x/:current_position_y/:radius')
        .get(controller.list_attractions_nearby)
}