const express = require('express');
const validator = require('../util/validator');
let Gateway = require('../model/gateway.model');

exports.listing = function (req, res) {
    Gateway.find(function (err, gateway) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(gateway);
        }
    });
};


exports.findById = function (req, res) {
    let id = req.params.id;
    Gateway.findById(id, function (err, gateway) {
        res.json(gateway);
    });
};

exports.create = function (req, res) {
    if (req.body.peripheral.length <= 10) {
        if (validator.ipAddress(req.body.ipaddress)) {
            let gateway = new Gateway(req.body);
            gateway.save()
                .then(gateway => {
                    res.status(200).json({'gateway': 'gateway in added successfully', id: gateway._id});
                })
                .catch(err => {
                    res.status(400).send('unable to save to database');
                });
        } else {
            res.status(400).send('unable to create is bad ipaddress IPv4');
        }
    } else {
        res.status(400).send('unable to create because peripheral > 10 elements');
    }

};

exports.update = function (req, res) {
    Gateway.findById(req.params.id, function (err, gateway) {
        if (!gateway)
            res.status(404).send('data is not found');
        else {
            if (req.body.peripheral.length <= 10) {
                if (validator.ipAddress(req.body.ipaddress)) {
                    gateway.serial = req.body.serial;
                    gateway.name = req.body.name;
                    gateway.ipaddress = req.body.ipaddress;
                    gateway.peripheral = req.body.peripheral;
                    gateway.save()
                        .then(gateway => {
                            res.json({'gateway': 'Update complete', 'id': gateway._id});
                        }).catch(err => {
                        res.status(400).send('unable to update the database');
                    });
                } else {
                    res.status(400).send('unable to update is bad ipaddress IPv4');

                }

            } else {
                res.status(400).send('unable to update the database because peripheral > 10 elements');
            }

        }
    });
};

exports.delete = function (req, res) {
    Gateway.findByIdAndDelete({_id: req.params.id}, function (err, gateway) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
};

