'use strict';

module.exports = (fileId, { fileRepository }) => {
  return fileRepository.remove(fileId);
};
