'use strict';

const parameter_list = require('../_models/parameter_list')

exports.get_parameter_list = function (req, res) {
    res.json(parameter_list);
}