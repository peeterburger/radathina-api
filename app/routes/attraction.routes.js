'use strict';

const express = require('express');
const router = express.Router();

const constants = require('../config/constants');
const functions = require('../config/functions');

const Attraction = require('../models/attraction');

router.get('/', async (req, res) => {
    res.json('get attractions info');
});

router.get('/list', async (req, res) => {
    const amount = +req.query.amount || 0;

    if (Math.abs(amount) > 500) {
        return res.status(400).json("Invalid amount");
    }

    try {
        const attractions = await Attraction.getAttraction({
            amount
        });
        return res.status(200).json(attractions);
    } catch (err) {
        return res.status(err).json(err);
    }

});

router.get('/list/:attraction_name', async (req, res) => {
    const attraction_name = req.params.attraction_name;

    try {
        const first_attraction = await Attraction.getAttraction({
            amount: 1,
            filter: {
                name: attraction_name
            }
        });
        return res.status(200).json(first_attraction);
    } catch (err) {
        return res.status(err).json(err);
    }

});

router.get('/nearby', async (req, res) => {
    const lat1 = req.query.lat;
    const lon1 = req.query.lon;
    const radius = req.query.radius || constants.DEFAULT_NEARBY_RADIUS_M;

    if (!(functions.validateCoordinates(lat1, lon1))) {
        return res.status(400).json('Invalid Coordinates');
    }

    try {
        let attractions_nearby = [];
        const attractions_all = await Attraction.getAttraction({});

        attractions_all.forEach(attraction => {
            let lat2 = attraction.coordinates.lat;
            let lon2 = attraction.coordinates.lon;

            let beeline = functions.calculateBeeline(lat1, lon1, lat2, lon2);

            console.log(lat1 + "," + lon1 + " -> " + lat2 + "," + lon2 + " = " + beeline + "m");

            if (beeline <= radius) {
                attractions_nearby.push(attraction);
            }
        });

        return res.status(200).json(attractions_nearby);
    } catch (err) {
        return res.status(err).json(err);
    }
});

module.exports = router;