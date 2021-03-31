const { mongo } = require('mongoose');
const mongoose = require('../mongoose');

const fileSchema = new mongoose.Schema({
  contributionId: {
      type: mongoose.ObjectId,
      ref: 'Contribution'
  },
  filename: String,
  path: String,
  uploadedAt: {type: Date, default: Date.now},
  updatedAt: {type: Date, default: Date.now}
});


module.exports = mongoose.model('File', fileSchema, 'Files');
