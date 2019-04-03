'use strict';

const randomstring = require('randomstring');
const crypto = require('crypto');

function getAllAttractions() {
    var request = {};

    request.request_id = crypto.createHash('sha1').update(randomstring.generate(10)).digest('hex');
    request.client_id = crypto.createHash('sha1').update('23:32:12:rr:aa:vv').digest('hex');

    return request;
}

function getAttractionsByName() {
    var request = {};
    request.request_id = randomstring.generate(10);
}

function calculateBeeLine() {
    var request = {};
    request.request_id = randomstring.generate(10);
}

console.log(getAllAttractions());