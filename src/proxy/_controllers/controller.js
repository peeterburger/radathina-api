'use strict';

const fs = require('fs');

var Client = require('node-rest-client').Client;
var client = new Client();

exports.get_parameter_list = function (req, res) {
    fs.readFile(`../_models/parameter_list.json`, (err, data) => {
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
};

exports.proxy = function (req, res) {
    var url = req.query.url;
    var apiKey = "5b3ce3597851110001cf624892e3aee660dd4e36a94e389509ba388c";

    url = url.replaceAll("<slash>", "/");
    url = url.replaceAll("<questionmark>", "?");
    url = url.replaceAll("<and>", "&");
    url = url.replaceAll("<key>", apiKey);

    // direct way
    client.get(url, function (data, response) {
        res.send(data);
    });
    
}

String.prototype.replaceAll = function (search, replacement) {
    var target = this;
    return target.replace(new RegExp(search, 'g'), replacement);
};