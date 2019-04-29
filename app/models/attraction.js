'use strict';

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const AttractionSchema = new Schema({
    name: {
        type: String,
        trim: true,
        required: true,
        unique: true
    },
    coordinates: {
        lat: Number,
        lon: Number
    },
    description: {
        type: String
    },
    category: {
        type: String
    }
}, {
    timestamps: true
});

/**
 * Definiert eine Funktion, welche bei der Ausführung
 * die Sehenswürdigkeiten von der Datenbank ausliest
 * und sie anschließend zurückgibt.
 * 
 * @param {number [= 0]} amount Die maximale Anzahl an
 * zurückgegebenen Sehenswürdigkeiten.
 * @param {object [= {}]} filter Ein Filter, welcher an
 * die Query angehängt wird, um gezielte Sehenswürdigkeiten
 * zurückzugeben.
 */
AttractionSchema.statics.getAttraction = function ({
    amount = 0,
    filter = {}
}) {

    // Der Filter für die Query wird gessetzt. Bei filter = {}
    // -> kein Filter
    const query = {
        ...filter
    };

    // Die Query wird an die MongoDB geschickt und auf das
    // Resultat gewartet. Sollte ein Fehler auftreten, wird
    // dieser als 'Promise.reject()' zurückgegeben.
    return new Promise((resolve, reject) => {
        this.find(query, {}, {
            limit: amount
        }, (err, attractions) => {
            if (err) return reject(err);

            // Ist das Resultat der Query 'null' oder 'undefined' 
            // wird ein leeres Array zurückgegeben.
            attractions = attractions || [];

            // Sollte nur ein Resultat zurückgegeben werden,
            // wird nur dieses zurückgegeben. Ansonsten wird
            // das gesammte Array mit den Resultaten zurück-
            // geliefert
            resolve(amount == 1 ? attractions[0] : attractions);
        });
    });
};

const Attraction = mongoose.model('Attraction', AttractionSchema);

module.exports = Attraction;