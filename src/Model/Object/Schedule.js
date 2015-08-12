'use strict'

let Promise = require("bluebird");
let _ = require("lodash");
let Basic = require("./Basic");

class Schedule extends Basic {

    constructor(selector_data, selector, def_params = {}) {
        console.log("Creating schedule:", selector_data, selector);
        super(selector_data, selector);
        //params as scheme default vals; db_value takes 
        let params = def_params || {};
        this.db_value = {
            name: def_params.name || null,
            period: def_params.period || 7, //in days
            content: def_params.content || [[], [], [], [], [], [], []] //schedules by day
        };

        return this;
    }
}

module.exports = Schedule;