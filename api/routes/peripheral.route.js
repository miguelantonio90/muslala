const express = require('express');
const peripheralRoutes = express.Router();

let controller = require('../controller/peripheral.controller');

// Defined get data(index or listing) route
peripheralRoutes.route('/').get(function (req, res) {
    controller.listing(req, res);
});

//Defined create route
peripheralRoutes.route('/create').post(function (req, res) {
    controller.create(req, res);
});

// Defined edit route
peripheralRoutes.route('/findBy/:id').get(function (req, res) {

    controller.findById(req, res);

});

//  Defined update route
peripheralRoutes.route('/update/:id').post(function (req, res) {
    controller.update(req, res);
});


// Defined delete | remove | destroy route
peripheralRoutes.route('/delete/:id').get(function (req, res) {
    controller.delete(req, res);

});
module.exports = peripheralRoutes;