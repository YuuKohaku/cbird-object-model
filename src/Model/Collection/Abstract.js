'use strict'

var _ = require("lodash");
var bucket = false;

class AbstractCollection {
    constructor() {
        this.collection = {}; //[{key: el/1, value: {}}]
        if (!bucket)
            throw new Error("Database is not settled.");
        this.db = bucket;
    }

    static set_database(db) {
        bucket = db;
    }

    //when loading, search for type in Model.Object; if not found, create default object (Abstract)
    //so strange
    load_from_db() {
        throw new Error("Abstract method.");
    }

    as_array() {
        return _.values(this.collection);
    }

    as_map() {
        return this.collection;
    }
}

module.exports = AbstractCollection;