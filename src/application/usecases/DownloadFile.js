'use strict';

module.exports = async (fileId, { fileRepository }) => {
    const file = await fileRepository.get(fileId);
    console.log(file);
    if (file) return file.path + file.filename;
    return null;
};
