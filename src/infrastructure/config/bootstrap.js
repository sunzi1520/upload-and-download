'use strict';

require('dotenv').config();

const constants = require('./constants');
const config = require('./index');

module.exports = {

  async init() {
    if (config.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
      require('../orm/moogose/mongoose');
    }
  }
};
