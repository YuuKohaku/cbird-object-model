'use strict'

var AbstractSelector = require("./Abstract");

class LinkSelector extends AbstractSelector {
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
        var parts = (new RegExp(/(\w+)\/(\w+\/\d+)\/(\w+\/\d+)/gi)).exec(selector);
        return {
            type: parts[1],
            bound_src: parts[2],
            bound_dst: parts[3]
        };
    }
}

module.exports = LinkSelector;