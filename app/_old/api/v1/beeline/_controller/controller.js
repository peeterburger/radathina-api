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

// Berechnet die Luftlinie zwischen zwei geographischen Koordinaten.
exports.calculate_beeline = function (req, res) {

    // Sollten ein oder mehrere Fehler auftreten, werden diese in ein Fehler-
    // Array geschrieben.
    var error_list = [];

    // Die res-Parameter werden in neue Variablen gespeichert, um folgenden
    // Code so kurz und übersichlich wie möglich zu geschtalten.
    var lon1 = req.query.lon1;
    var lat1 = req.query.lat1;
    var lon2 = req.query.lon2;
    var lat2 = req.query.lat2;

    // Überprüft die übergebenen geographischen Koordinaten auf Fehler.
    // Longitude (min): -180
    // Longitude (max): 180
    // Latitude (min): -90
    // Latitude (max): 90
    if (lon1 < -180 || lon1 > 180) {
        error_list.push('ERROR: Current Position Longitude (' + lon1 + ') invalid. Accaptable Range: >= -180 AND <=180');
    }
    if (lat1 < -90 || lat1 > 90) {
        error_list.push('ERROR: Current Position Latitude (' + lat1 + ') invalid. Accaptable Range: >= -90 AND <=90');
    }
    if (lon2 < -180 || lon2 > 180) {
        error_list.push('ERROR: Target Position Longitude (' + lon2 + ') invalid. Accaptable Range: >= -180 AND <=180');
    }
    if (lat2 < -90 || lat2 > 90) {
        error_list.push('ERROR: Target Position Latitude (' + lat2 + ') invalid. Accaptable Range: >= -90 AND <=90');
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
        var d_lat = lat2 * Math.PI / 180 - lat1 * Math.PI / 180;
        var d_lon = lon2 * Math.PI / 180 - lon1 * Math.PI / 180;

        // Hier wird effektiv die Distanz beider Koordinaten berechnet.
        // Um die Krümmung der Erde zu berücksichtigen, wird die 'Haversine
        // formula' verwendet, um ein genaueres Ergebnis zu erzielen.

        // Um die Distanz zu berechnen, werden die Koordinaten als kugelförmiges
        // Dreieck auf der Erdoberfläche dargestellt. Anschließend werden jeweils
        // die Längen der Seite berechnet, wobei Seite c der gewünschten Distanz
        // entspricht.
        var a = Math.sin(d_lat / 2) * Math.sin(d_lat / 2) +
            Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
            Math.sin(d_lon / 2) * Math.sin(d_lon / 2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

        // Die effektive Distanz in km ist c mal dem Radius der Erde.
        var d = RADIUS_EARTH * c;

        res.json(d);
    }
}