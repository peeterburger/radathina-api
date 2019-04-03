'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/attractions')
        .get(controller.get_attractions_all);

    app.route('/attractions/:attr_name')
        .get(controller.get_attractions_by_name);

    app.route('/attractions/:c_pos_lon/:c_pos_lat/:radius')
        .get(controller.get_attractions_nearby);

    app.route('/beeline/:c_pos_lon/:c_pos_lat/:t_pos_lon/:t_pos_lat')
        .get(controller.calculate_beeline);
};