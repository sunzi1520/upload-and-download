'use strict'

const UploadFile = require('../../application/usecases/UploadFile');
const ListFiles = require('../../application/usecases/ListFiles');
const DeleteFile = require('../../application/usecases/DeleteFile');
const DownloadFile = require('../../application/usecases/DownloadFile.js');

module.exports = {
    uploadFile,
    listFiles,
    deleteFile,
    downloadFile
}

async function uploadFile(req, res, next) {
    try {
        const serviceLocator = req.server.app.serviceLocator;
        
        if (!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            })
        }

        const file = req.files.upload;

        const uploadedFile = await UploadFile(file, serviceLocator);

        console.log(uploadedFile);

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: file.name,
                mimetype: file.mimetype,
                size: file.size
            }
        });
    } catch(err) {
        res.status(500).send(err);
    }
}

async function listFiles(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    const files = await ListFiles(serviceLocator);

    res.send(serviceLocator.fileSerializer.serialize(files));
}

async function deleteFile(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const fileId = req.params.id;

    const file = await DeleteFile(fileId, serviceLocator);

    res.send({
        status: true,
        deletedFile: serviceLocator.fileSerializer.serialize(file)
    })
}

async function downloadFile(req, res, next) {
    //Context
    const serviceLocator = req.server.app.serviceLocator;

    //Input
    const fileId = req.params.id;
    
    const file = await DownloadFile(fileId, serviceLocator);

    if (!file) res.status(404).end();

    res.download(file)
}