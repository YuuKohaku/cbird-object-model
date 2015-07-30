'use strict'

var Promise = require("bluebird");
var _ = require("lodash");
var Abstract = require("./Abstract");

class Schedule extends Abstract {

    constructor(db_id, selector, def_params) {
        super(db_id, selector);
        //params as scheme default vals
        var params = def_params || {};
        this.scheme = {
            name: null,
            period: 1, //in days
            content: [] //schedules by day
        };
        _.merge(this, this.scheme, def_params);
        //still unknown
        this.db_value = false;

        return this;
    }
}

module.exports = Schedule;