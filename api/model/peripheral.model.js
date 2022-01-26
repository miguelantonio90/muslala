const mongoose = require('mongoose');
const Schema = mongoose.Schema;
/**
 * UID (number),
 * vendor (string),
 * date created,
 * status - online/offline.
 */
let Peripheral = new Schema({
    uid: {
        type: Number
    },
    vendor: {
        type: String
    },
    date: {
        type: String
    },
    status: {
        type: Boolean
    }
}, {
    collection: 'peripheral'
});
module.exports = mongoose.model('Peripheral', Peripheral);