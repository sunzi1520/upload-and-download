'use strict';

const File = require('../../domain/models/File');
const MongooseFile = require('../orm/moogose/schemas/File.js');
const FileRepository = require('../../domain/respositories/FileRespository');

module.exports = class extends FileRepository {

  constructor() {
    super();
  }

  async persist(fileEntity) {
    console.log('Persist: ', fileEntity);
    const { contributionId, filename, path } = fileEntity;
    const mongooseFile = new MongooseFile({ contributionId, filename, path });
    await mongooseFile.save();
    return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
  }

  async merge(fileEntity) {
    console.log(fileEntity);
    const { id, filename, contributionId, path, uploadedAt, updatedAt } = fileEntity;
    const mongooseFile = MongooseFile.findByIdAndUpdate(id, { filename, contributionId, path, uploadedAt, updatedAt });
    return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
  }


  async remove(fileId) {
    return MongooseFile.findOneAndDelete(fileId);
  }

  async get(fileId) {
    const mongooseFile = await MongooseFile.findById(fileId);
    return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
  }

  async getByName(filename) {
    const mongooseFile = await MongooseFile.findOne({filename});
    if (!mongooseFile) return null;
    return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
  }

  async find() {
    const mongooseUsers = await MongooseFile.find();
    return mongooseUsers.map((mongooseFile) => {
      return new File(mongooseFile.id, mongooseFile.contributionId, mongooseFile.filename, mongooseFile.path, mongooseFile.uploadedAt, mongooseFile.updatedAt);
    });
  }

};
