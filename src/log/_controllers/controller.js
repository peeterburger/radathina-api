'use strict';

const fs = require('fs');
const path = require('path');

const parameter_list = require('../_models/parameter_list');

exports.get_parameter_list = function (req, res) {
    res.send(parameter_list);
}

exports.get_log_info = function (req, res) {
    fs.readFile(path.join(__dirname, '../_models/info.log'), 'utf8', function (err, contents) {
        if (err) {
            console.log(err);
        } else {
            res.send(contents);
        }
    });
};

exports.get_log_error = function (req, res) {
    fs.readFile(path.join(__dirname, '../_models/error.log'), 'utf8', function (err, contents) {
        if (err) {
            console.log(err);
        } else {
            res.send(contents);
        }
    });
}