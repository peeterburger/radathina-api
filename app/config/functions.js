'use strict';

const constants = require('./constants');

module.exports = {
    calculateBeeline: (lat1, lon1, lat2, lon2) => {
        let d_lat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let d_lon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
                Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
                Math.sin(d_lon / 2) * Math.sin(d_lon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = constants.EARTH_RADIUS_M * c;
        return d;
    }
};