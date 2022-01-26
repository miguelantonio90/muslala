const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 4000;
const cors = require('cors');
const mongoose = require('mongoose');
const config = require('./config/config.db');
const gatewayRoute = require('./routes/gateway.route');
const peripheralRoute = require('./routes/peripheral.route');

mongoose.Promise = global.Promise;
mongoose.connect(config.DB, {useNewUrlParser: true}).then(
    () => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    }
);

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.use('/gateway', gatewayRoute);
app.use('/peripheral', peripheralRoute);

app.listen(PORT, function () {
    console.log('Server is running on Port:', PORT);
});