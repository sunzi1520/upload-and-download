'use strict';

const constants = require('./constants');
const config = require('./index');

function buildBeans() {

  const beans = {
  };

  if (environment.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    throw new Error('Add In-memory support');
  } else if (environment.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    throw new Error('Add Mongo support');
  } else {
    throw new Error('This database is not supported');
  }

  return beans;
}

module.exports = buildBeans();
