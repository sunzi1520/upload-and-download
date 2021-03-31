'use strict';

const File = require('../../domain/models/File');

module.exports = async (file, { fileRepository }) => {
    try {
        const sameFile = await fileRepository.getByName(file.name);
        console.log(sameFile);
        if (sameFile && sameFile.id) { 
            const modifiedFile = new File(sameFile.id, sameFile.contributionId, sameFile.filename, sameFile.path, sameFile.uploadedAt, new Date());
            return fileRepository.merge(modifiedFile);
        }
        const path = './static/storage/contributions/';
        const aFile = new File(null, null, file.name, path, undefined, undefined);
        file.mv(path + file.name);
        return fileRepository.persist(aFile);
    } catch(err) {
        console.log(err);
    }
}