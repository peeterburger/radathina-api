'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/attractions')
        .get(controller.get_attractions_all);

    app.route('/attractions/:attr_name')
        .get(controller.get_attractions_by_name);

    app.route('/attractions/:current_pos_x/:current_pos_y/:radius')
        .get(controller.get_attractions_nearby);

    app.route('/beeline/:pos_x/:pos_y')
        .get(controller.calculate_bee_line);
};