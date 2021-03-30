'use strict'

const UploadFile = require('../use-cases/UploadFile');

module.exports = {
    upload: upload
}

function upload(req, res, next) {
    try {
        if (!req.files) {
            return res.send({
                status: false,
                message: 'No file uploaded'
            })
        }

        let doc = req.files.doc;

        doc.mv('./fileStorage/contributions/' + doc.name);

        res.send({
            status: true,
            message: 'File is uploaded',
            data: {
                name: doc.name,
                mimetype: doc.mimetype,
                size: doc.size
            }
        });
    } catch(err) {
        res.status(500).send(err);
    }
}