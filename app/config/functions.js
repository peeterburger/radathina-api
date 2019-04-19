'use strict';

const constants = require('./constants');

module.exports = {

    /**
     * Berechnet die Luftlinie zwischen zwei geografischen Koordinaten
     * und gibt sie anschließend zurück. Um ein genaueres Resultat zu
     * liefern, wird die Erdkrümmung miteinbezogen.
     * 
     * Formel: https://de.wikipedia.org/wiki/Luftlinie
     *
     * @param {number} lat1 Breitengrad des ersten Punktes.
     * @param {number} lon1 Längengrad des ersten Punktes.
     * @param {number} lat2 Breitengrad des zweiten Punktes.
     * @param {number} lon2 Längengrad des zweiten Punktes.
     * @return {number} Die Luftlienie zwischen den beiden Punkten.
     */
    calculateBeeline: (lat1, lon1, lat2, lon2) => {
        let d_lat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        let d_lon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;
        let a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(d_lon / 2) * Math.sin(d_lon / 2);
        let c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        let d = constants.EARTH_RADIUS_M * c;
        return d;
    },

    /**
     * Überprüft eine geografische Koordinate nach ihrer 
     * Gültigkeit.
     * 
     * Formel: https://de.wikipedia.org/wiki/Geographische_Koordinaten
     *
     * @param {number} lat Breitengrad des Punktes.
     * @param {number} lon Längengrad des Punktes.
     * @return {boolean} Die Gültigkeit des Punktes.
     */
    validateCoordinates: (lat, lon) => {
        return (Math.abs(lat) <= 90) && (Math.abs(lon) <= 180);
    }
};