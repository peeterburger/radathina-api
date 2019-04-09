'use strict';

const database = require('../_models/database/database');
const parameter_list = require('../_models/parameter_list')

exports.get_parameter_list = function (req, res) {
    res.json(parameter_list);
}

// Listet alle Sehenswürdigkeiten auf und gibt sie als Array zurück.
exports.get_attractions_all = function (req, res) {
    var result = [];
    for (var i = 0; i < database.length; i++) {
        result.push(database[i]);
    }
    res.json(result);
};

// Listet alle Sehenswürdigkeiten mit dem übergebenen Namen auf und gibt
// sie als Array zurück.
exports.get_attractions_by_name = function (req, res) {
    var result = [];
    for (var i = 0; i < database.length; i++) {
        var attr = database[i];
        if (attr.name.toUpperCase() === req.params.attr_name.toUpperCase()) {
            result.push(attr);
        }
    }
    res.json(result);
};

// Listet alle Sehenswürdigkeiten in einem gewissen Radius um den aktuellen
// Standort aus.
exports.get_attractions_nearby = function (req, res) {
    for (var sehenswürdigkeit in database) {
        break;
    }
};