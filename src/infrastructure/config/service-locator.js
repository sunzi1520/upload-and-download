'use strict';

const constants = require('./constants');
const config = require('./index');
const FileSerializer = require('../../interface/serializers/FileSerializer');
const FileSystem = require('fs');

function buildBeans() {

  const beans = {
    fileSerializer: new FileSerializer(),
    fileSystem: FileSystem
  };

  if (config.database.dialect === constants.SUPPORTED_DATABASE.IN_MEMORY) {
    throw new Error('Add In-memory support');
  } else if (config.database.dialect === constants.SUPPORTED_DATABASE.MONGO) {
    const FileRepositoryMongo = require('../repositories/FileRespositoryMongo');
    beans.fileRepository = new FileRepositoryMongo();
  } else {
    throw new Error('This database is not supported');
  }


  return beans;
}

module.exports = buildBeans();
