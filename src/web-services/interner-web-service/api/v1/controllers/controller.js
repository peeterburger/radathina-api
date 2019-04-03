'use strict';

const database = require('../models/database/database');

// Listet alle Sehenswürdigkeiten auf und gibt sie als Array zurück.
exports.get_attractions_all = function (req, res) {
    var result = [];
    for (var i = 0; i < database.length; i++) {
        result.push(database[i]);
    }
    res.json(result);
};

// Listet alle Sehenswürdigkeiten mit dem übergebenen Namen auf und gibt
// sie als Array zurück.
exports.get_attractions_by_name = function (req, res) {
    var result = [];
    for (var i = 0; i < database.length; i++) {
        var attr = database[i];
        if (attr.name.toUpperCase() === req.params.attr_name.toUpperCase()) {
            result.push(attr);
        }
    }
    res.json(result);
};

// Listet alle Sehenswürdigkeiten in einem gewissen Radius um den aktuellen
// Standort aus.
exports.get_attractions_nearby = function (req, res) {
    for (var sehenswürdigkeit in database) {
        break;
    }
};

// Berechnet die Luftlinie zwischen zwei geographischen Koordinaten.
exports.calculate_beeline = function (req, res) {

    // Sollten ein oder mehrere Fehler auftreten, werden diese in ein Fehler-
    // Array geschrieben.
    var error_list = [];

    // Die res-Parameter werden in neue Variablen gespeichert, um folgenden
    // Code so kurz und übersichlich wie möglich zu geschtalten.
    var c_pos_lat = req.params.c_pos_lat;
    var c_pos_lon = req.params.c_pos_lon;
    var t_pos_lat = req.params.t_pos_lat;
    var t_pos_lon = req.params.t_pos_lon;

    // Überprüft die übergebenen geographischen Koordinaten auf Fehler.
    // Longitude (min): -180
    // Longitude (max): 180
    // Latitude (min): -90
    // Latitude (max): 90
    if (c_pos_lon < -180 || c_pos_lon > 180) {
        error_list.push('ERROR: Current Position Longitude (' + c_pos_lon + ') invalid. Accaptable Range: >= -180 AND <=180');
    }
    if (c_pos_lat < -90 || c_pos_lat > 90) {
        error_list.push('ERROR: Current Position Latitude (' + c_pos_lat + ') invalid. Accaptable Range: >= -90 AND <=90');
    }
    if (t_pos_lon < -180 || t_pos_lon > 180) {
        error_list.push('ERROR: Target Position Longitude (' + t_pos_lon + ') invalid. Accaptable Range: >= -180 AND <=180');
    }
    if (t_pos_lat < -90 || t_pos_lat > 90) {
        error_list.push('ERROR: Target Position Latitude (' + t_pos_lat + ') invalid. Accaptable Range: >= -90 AND <=90');
    }

    // Falls das Fehler-Array nicht leer ist, ist bei der Überprüfung
    // der Koordinaten ein Fehler aufgetreten. Anstatt der Lösung wird
    // die Fehlerliste an den Client gesendet.
    if (error_list.length > 0) {
        res.json(error_list);
    } else {

        // Sollte kein Fehler aufgetreten sein, kann mit der Berechnung der
        // Distanzen zwischen aktuellem Standpunkt und dem Ziel berechnet
        // werden.

        // Radius der Erde in km. Wird im späteren Verlauf der Rechnung
        // gebraucht.
        const RADIUS_EARTH = 6378.137;

        // Berechnet die Distanzen zwischen jeweils der Longitude und der
        // Latitude.
        var d_lat = t_pos_lat * Math.PI / 180 - c_pos_lat * Math.PI / 180;
        var d_lon = t_pos_lon * Math.PI / 180 - c_pos_lon * Math.PI / 180;

        // Hier wird effektiv die Distanz beider Koordinaten berechnet.
        // Um die Krümmung der Erde zu berücksichtigen, wird die 'Haversine
        // formula' verwendet, um ein genaueres Ergebnis zu erzielen.

        // Um die Distanz zu berechnen, werden die Koordinaten als kugelförmiges
        // Dreieck auf der Erdoberfläche dargestellt. Anschließend werden jeweils
        // die Längen der Seite berechnet, wobei Seite c der gewünschten Distanz
        // entspricht.
        var a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
            Math.cos(c_pos_lat * Math.PI / 180) * Math.cos(t_pos_lat * Math.PI / 180) *
            Math.sin(d_lon / 2) * Math.sin(d_lon / 2);

        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Die effektive Distanz in km ist c mal dem Radius der Erde.
        var d = RADIUS_EARTH * c;

        res.json(d);
    }
}