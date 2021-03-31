'use strict';

module.exports = async (fileId, { fileSystem, fileRepository }) => {
  const file = await fileRepository.remove(fileId);
  if (!file) return file;
  fileSystem.unlink(file.path+file.filename, (err) => {
    console.log(err)
  });
  return file;
};
