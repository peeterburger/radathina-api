'use strict';

const fs = require('fs');

exports.get_parameter_list = function (req, res) {
    fs.readFile(`${__dirname}/../_models/parameter_list.json`, (err, data) => {
        if(err){
            res.send('Error loading "../_models/parameter_list.json"')
        } else {
            try {
                res.json(JSON.parse(data)); 
            } catch (e) {
                res.send('Error parsing "../_models/parameter_list.json"')
            }
        }
    });
}

// Listet alle Sehenswürdigkeiten auf und gibt sie als Array zurück.
exports.get_attractions_all = function (req, res) {
    fs.readFile(`${__dirname}/../_models/attractions/attractions.json`, (err, data) => {
        if(err){
            res.send('Error loading "../_models/attractions/attractions.json"')
        } else {
            try {
                let attractions = JSON.parse(data);
                var result = [];
                for (var i = 0; i < attractions.length; i++) {
                    result.push(attractions[i]);
                }
                res.json(result);
            } catch (e) {
                res.send('Error parsing "../_models/attractions/attractions.json"')
            }
        }
    });
}

// Listet alle Sehenswürdigkeiten mit dem übergebenen Namen auf und gibt
// sie als Array zurück.
exports.get_attractions_by_name = function (req, res) {
    fs.readFile(`${__dirname}/../_models/attractions/attractions.json`, (err, data) => {
        if(err){
            res.send('Error loading "../_models/attractions/attractions.json"')
        } else {
            try {
                let attractions = JSON.parse(data);
                var result = [];
                for (var i = 0; i < attractions.length; i++) {
                    var attr = attractions[i];
                    if (attr.name.toUpperCase() === req.params.attr_name.toUpperCase()) {
                        result.push(attr);
                    }
                }
                res.json(result);
            } catch (e) {
                res.send('Error parsing "../_models/attractions/attractions.json"')
            }
        }
    });
}

// Listet alle Sehenswürdigkeiten in einem gewissen Radius um den aktuellen
// Standort aus.
exports.get_attractions_nearby = function (req, res) {
    for (var sehenswürdigkeit in database) {
        break;
    }
}