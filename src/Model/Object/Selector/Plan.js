'use strict'

var AbstractSelector = require("./Abstract");

class PlanSelector extends AbstractSelector {
    constructor() {
        super();
    }

    static compose({
        type: type,
        id: id,
        subname: subname
    }) {
        var sel = [(type + "-" + subname), id].join("/");
        return sel;
    }

    static decompose(selector) {
        var parts = (new RegExp(/(.+)-(.+)\/(\d+)/gi)).exec(selector);
        return {
            type: parts[1],
            id: parts[3],
            subname: parts[2]
        };
    }
}

module.exports = PlanSelector;