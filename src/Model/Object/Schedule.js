'use strict'

var Promise = require("bluebird");
var _ = require("lodash");
var Abstract = require("./Abstract");

class Schedule extends Abstract {

    constructor(selector_data, selector, def_params = {}) {
        console.log("Creating schedule:", selector_data, selector);
        super(selector_data, selector);
        //params as scheme default vals; db_value takes 
        var params = def_params || {};
        this.db_value = {
            name: def_params.name || null,
            period: def_params.period || 7, //in days
            content: def_params.content || [[], [], [], [], [], [], []] //schedules by day
        };

        return this;
    }
}

module.exports = Schedule;