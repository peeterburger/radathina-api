'use strict';

const database = require('../models/database/database');

exports.get_attractions_all = function(req, res) {
    var result = {};
    for(var entry in database) {
        result.push(entry);
    }
    res.send();
};