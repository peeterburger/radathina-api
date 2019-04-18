'use strict';

const express = require('express');
const router = express.Router();

const functions = require('../config/functions');

router.get('/', async (req, res) => {
    // get attractions info
    res.json("get beeline info");
});

router.get('/calculate', async (req, res) => {
    let lon1 = req.query.lon1;
    let lat1 = req.query.lat1;
    let lon2 = req.query.lon2;
    let lat2 = req.query.lat2;

    if (!(functions.validateCoordinates(lat1, lon1) &&
            functions.validateCoordinates(lat2, lon2))) {
        return res.status(400).json("Invalid Coordinates");
    }

    let beeline = functions.calculateBeeline(lat1, lon1, lat2, lon2);

    return res.status(200).json(beeline);
});

module.exports = router;