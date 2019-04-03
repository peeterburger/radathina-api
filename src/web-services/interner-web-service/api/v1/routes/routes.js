'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/attractions')
        .get(controller.get_attractions_all);

    app.route('/attractions/:attr_name')
        .get(controller.get_attractions_by_name);

    app.route('/attractions/:current_position_x/:current_position_y/:radius')
        .get(controller.get_attractions_nearby);
};