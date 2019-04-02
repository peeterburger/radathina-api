'use strict';

module.exports = function(app) {
    var controller = require('../controllers/controller');

    app.route('/attractions')
        .get()
        .post()

    app.route('/attractions/:attr_name')
        .get()
        .post()

    app.route('/attractions/:radius')
        .get()
        .post()
        
}