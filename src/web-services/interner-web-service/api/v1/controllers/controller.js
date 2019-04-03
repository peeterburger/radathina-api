'use strict';

const database = require('../models/database/database');

exports.get_attractions_all = function(req, res) {
    var result = [];
    for(var i = 0; i < database.length; i++){
        result.push(database[i]);
    }
    res.json(result);
};

exports.get_attractions_by_name = function(req, res) {
    var result = [];
    for(var i = 0; i < database.length; i++) {
        var attr = database[i];
        if(attr.name.toUpperCase() === req.params.attr_name.toUpperCase()){
            result.push(attr);
        }
    }
    res.json(result);
};

exports.get_attractions_nearby = function(req, res) {
    for(var sehenswürdigkeit in database) {
        break;
    }
};

exports.calculate_bee_line = function(req, res) {
    var pos_x = req.params.pos_x;
    var pos_y = req.params.pos_y;

    var current_pos_x = 0;
    var current_pos_y = 0;
    
    var dist_x = current_pos_x - pos_x;
    var dist_y = current_pos_y - pos_y;

    var result = Math.sqrt((Math.pow(dist_x, 2) + Math.pow(dist_y, 2)));

    res.json(result);
}