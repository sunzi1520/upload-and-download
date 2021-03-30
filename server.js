'use strict'

const config = require('./config');
const _ = require('lodash');
const express = require('express'),
    app = express();
const cors = require('cors'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload');
const morgan = require('morgan');
const route = require('./route');

app.use(fileUpload({
    createParentPath: true
}));

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended: true}));
app.use(morgan('dev'));

app.use(function (res, req, next) {
    if (!res.app && !res.app.serviceLocator) {
        res.app = {
            serviceLocator: require('./config/service-locator')
        };
    }
    next();
})

route(app);

app.listen(config.server.port, ()=>{
    console.log(`The server is listening on the port ${config.server.port}...`);
})