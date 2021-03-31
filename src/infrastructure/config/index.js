'use strict'

const constants = require('./constants');

module.exports = (() => {
    const config = {
        server: {
            port: process.env.PORT || 3000
        },
        database: {
            dialect: process.env.DATABASE_DIALECT || constants.SUPPORTED_DATABASE.MONGO,
            uri: process.env.DATABASE_URI || 'mongodb://localhost:27017/magazine-test'
        }
    };

    if (process.env.NODE_ENV === 'test') {
        config.database = {
          driver: constants.SUPPORTED_DATABASE.IN_MEMORY
        }
    }

    return config;
})()
