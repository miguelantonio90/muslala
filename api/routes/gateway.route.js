const express = require('express');
const gatewayRoutes = express.Router();
const controller = require('../controller/gateway.controller');

// Defined get data(index or listing) route
gatewayRoutes.route('/').get(function (req, res) {
    controller.listing(req, res);
});

//Defined create route
gatewayRoutes.route('/create').post(function (req, res) {
    controller.create(req, res);
});

// Defined edit route
gatewayRoutes.route('/findBy/:id').get(function (req, res) {
    controller.findById(req, res);
});

//  Defined update route
gatewayRoutes.route('/update/:id').post(function (req, res) {
    controller.update(req, res);
});


// Defined delete | remove | destroy route
gatewayRoutes.route('/delete/:id').get(function (req, res) {
    controller.delete(req, res);
});

module.exports = gatewayRoutes;