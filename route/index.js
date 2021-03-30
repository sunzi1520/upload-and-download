'use strict'

const FileController = require('../controllers/FileController');

module.exports = (app) => {
    app.post('/upload', FileController.upload);
}