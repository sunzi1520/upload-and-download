'use strict'

const config = require('../config');
const _ = require('lodash');
const express = require('express'),
    app = express();
const cors = require('cors'),
    bodyParser = require('body-parser'),
    fileUpload = require('express-fileupload');
const morgan = require('morgan');
const routes = require('../../interface/routes');

const startServer = async () => {
    app.use(fileUpload({
        createParentPath: true
    }));
    
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({extended: true}));
    app.use(morgan('dev'));
    
    app.use(function (req, res, next) {
        if (!req.server || !req.server.app || !req.server.app.serviceLocator) {
            req.server = {
                app: {
                    serviceLocator: require('../config/service-locator')
                }
            };
        }
        next();
    })
    
    routes.AssignRoutes(app);
    
    app.use(function(req, res, next) {
        res.status(404).end();
    })
    
    app.listen(config.server.port, ()=>{
        console.log(`The server is listening on the port ${config.server.port}...`);
    })

}

module.exports = startServer;