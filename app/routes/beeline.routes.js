'use strict';

const express = require('express');
const router = express.Router();

const functions = require('../config/functions');

/**
 * Rootverzeichnis /beeline
 * 
 * @apipath [..]/beeline
 */
router.get('/', async (req, res) => {
    res.json('get beeline info');
});

/**
 * Berechnet die Luftlinie zwischen zwei geografischen
 * Koordinaten und sendet die dem Client.
 * 
 * @apipath [..]/beeline/calculate
 * @query {lat1} Breitengrad des ersten Punktes.
 * @query {lon1} Längengrad des ersten Punktes.
 * @query {lat2} Breitengrad des zweiten Punktes.
 * @query {lon2} Längengrad des zweiten Punktes.
 */
router.get('/calculate', async (req, res) => {
    let lon1 = req.query.lon1;
    let lat1 = req.query.lat1;
    let lon2 = req.query.lon2;
    let lat2 = req.query.lat2;

    if (!(functions.validateCoordinates(lat1, lon1) &&
            functions.validateCoordinates(lat2, lon2))) {
        return res.status(400).json('Invalid Coordinates');
    }

    let beeline = functions.calculateBeeline(lat1, lon1, lat2, lon2);

    return res.status(200).json(beeline);
});

module.exports = router;