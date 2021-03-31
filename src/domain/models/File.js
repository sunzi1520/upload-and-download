'use strict';

module.exports = class {

    constructor(id = null, contributionId = null, filename, path, uploadedAt, updatedAt) {
        this.id = id;
        this.contributionId = contributionId;
        this.filename = filename;
        this.path = path;
        this.uploadedAt = uploadedAt;
        this.updatedAt = updatedAt;
    }

};