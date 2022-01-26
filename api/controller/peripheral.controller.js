const express = require('express');
let Peripheral = require('../model/peripheral.model');


exports.listing = function (req, res) {
    Peripheral.find(function (err, peripheral) {
        if (err) {
            console.log(err);
        }
        else {
            res.json(peripheral);
        }
    });
};

exports.findById = function (req, res) {
    let id = req.params.id;
    Peripheral.findById(id, function (err, peripheral) {
        res.json(peripheral);
    });
};

exports.create = function (req, res) {
    let peripheral = new Peripheral(req.body);
    peripheral.save()
        .then(peripheral => {
            res.status(200).json({'peripheral': 'peripheral in added successfully', 'id': peripheral._id});
        })
        .catch(err => {
            res.status(400).send("unable to save to database");
        });
};

exports.update = function (req, res) {
    Peripheral.findById(req.params.id, function (err, peripheral) {
        if (!peripheral)
            res.status(404).send("data is not found");
        else {
            peripheral.uid = req.body.uid;
            peripheral.vendor = req.body.vendor;
            peripheral.date = req.body.date;
            peripheral.status = req.body.status;

            peripheral.save()
                .then(peripheral => {
                    res.json({'peripheral': 'Update complete', 'id': peripheral._id});
                })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
};

exports.delete = function (req, res) {
    Peripheral.findByIdAndDelete({_id: req.params.id}, function (err, peripheral) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
};

