'use strict';

const _serializeSingleFile = (file) => {
  return {
    'id': file.id,
    'name': file.filename,
    'uploadedAt': file.uploadedAt
  };
};

module.exports = class {

  serialize(data) {
    if (!data) {
      throw new Error('Expect data to be not undefined nor null');
    }
    if (Array.isArray(data)) {
      return data.map(_serializeSingleFile);
    }
    return _serializeSingleFile(data);
  }

};