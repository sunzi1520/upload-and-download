'use strict'

const FileController = require('./controllers/FileController');

exports.AssignRoutes = (app) => {
    app.post('/files/upload', FileController.uploadFile);
    app.get('/files', FileController.listFiles);
    app.delete('/files/:id', FileController.deleteFile);
    app.get('/files/:id', FileController.downloadFile);
}