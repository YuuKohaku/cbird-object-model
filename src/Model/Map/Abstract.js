'use strict'

class Abstract {
    constructor() {

    }

    static set_database(db) {
        this.db = db;
    }
}

module.exports = Abstract;