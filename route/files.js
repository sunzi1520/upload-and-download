'use strict'

const FileController = require('../controllers/FileController');

module.exports = function (app) {
    app.post('/upload', FileController.upload);
}