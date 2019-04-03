'use strict';

const database = require('../models/database/database');

exports.get_attractions_all = function(req, res) {
    var result = {};
    for(var entry in database) {
        result.push(entry);
    }
    res.json(result);
};

exports.get_attractions_by_name = function(res, req) {
    var result = {};
    for(var entry in database) {
        if(entry.name === req.params.attr_name){
            result.push(entry);
        }
    }
    res.json(result);
};

exports.get_attractions_nearby = function(res, req) {
    for(var sehenswürdigkeit in database) {

    }
};

exports.delete_attraction_by_name = function(res, req) {
    for(var entry in database) {
        if(entry.name === req.params.attr_name){
            res.json({ message: 'Task successfully deleted' });
            break;
        }
    }
};