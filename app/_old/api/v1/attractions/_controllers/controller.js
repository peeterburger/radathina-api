'use strict';

const fs = require('fs');

exports.get_parameter_list = function (req, res) {
    fs.readFile(`${__dirname}/../_models/parameter_list.json`, (err, data) => {
        if (err) {
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
        if (err) {
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
        if (err) {
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
    fs.readFile(`${__dirname}/../_models/attractions/attractions.json`, (err, data) => {
        if (err) {
            res.send('Error loading "../_models/attractions/attractions.json"')
        } else {
            try {
                let attractions = JSON.parse(data);
                var result = [];
                for (var i = 0; i < attractions.length; i++) {
                    var attr = attractions[i];

                    console.log("lon:" + req.params.lon);
                    console.log("lat:" + req.params.lat);
                    console.log("rad:" + req.params.radius);

                    console.log(measure(req.params.lat, req.params.lon, attr.koordinaten.lat, attr.koordinaten.lon));

                    if (measure(req.params.lon, req.params.lat, attr.koordinaten.lon, attr.koordinaten.lat) <= req.params.radius) {
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

function measure(lat1, lon1, lat2, lon2) { // generally used geo measurement function
    var R = 6378.137; // Radius of earth in KM
    var dLat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
    var dLon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
    var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
        Math.sin(dLon / 2) * Math.sin(dLon / 2);
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    var d = R * c;
    return d * 1000; // meters
}