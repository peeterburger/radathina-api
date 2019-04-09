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

exports.get_log_info = function (req, res) {
    fs.readFile(`${__dirname}/../_models/info.log`, 'utf8', function (err, contents) {
        if (err) {
            console.log(err);
        } else {
            res.send(contents);
        }
    });
}

exports.get_log_error = function (req, res) {
    fs.readFile(`${__dirname}/../_models/error.log`, 'utf8', function (err, contents) {
        if (err) {
            console.log(err);
        } else {
            res.send(contents);
        }
    });
}