'use strict'

var AbstractSelector = require("./Abstract");

class DefaultSelector extends AbstractSelector {
    constructor() {
        super();
    }

    static compose({
        type: type,
        id: id
    }) {
        var sel = [type, id].join("/");
        return sel;
    }

    //returns [type, id]
    static decompose(selector) {
        var parts = selector.split("/");
        return {
            type: parts[0],
            id: parts[1]
        };
    }
}

module.exports = DefaultSelector;