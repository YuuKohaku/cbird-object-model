'use strict'

var _ = require("lodash");
var Promise = require("bluebird");
var View = require("./View");

class TypedCollection extends View {
    constructor(params) {
        if (!params.type)
            throw new Error("Specify type of collection in params.");
        var view = {
            from: {
                ddoc: 'object',
                name: 'type'
            },
            limit: params.limit || false,
            offset: params.offset || false,
            key: params.type,
            range: {
                start: params.type,
                end: params.type,
                inclusive_end: true
            }
        };
        super(view);
    }

}

module.exports = TypedCollection;