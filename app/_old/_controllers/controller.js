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