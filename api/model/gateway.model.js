const mongoose = require('mongoose');
const Schema = mongoose.Schema;

/**
 a unique serial number (string),
 human-readable name (string),
 IPv4 address (to be validated),
 multiple associated peripheral devices
 */

let Gateway = new Schema({
    serial: {
        type: String
    },
    name: {
        type: String
    },
    ipaddress: {
        type: String
    },
    peripheral: {
        type: Array
    }
}, {
    collection: 'gateway'
});

module.exports = mongoose.model('Gateway', Gateway);