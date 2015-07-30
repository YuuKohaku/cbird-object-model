'use strict'

var AbstractSelector = require("./Abstract");

class DefaultSelector extends AbstractSelector {
    constructor(params) {
        super(params);
        if (this.db) {
            [this.type, this.id] = this.decompose(this.db);
        } else if (!this.type || !this.id) {
            throw new Error("Specify either db_id or type and id of object");
        }
        this.compose();
    }

    compose() {
        this.selector = this.selector || [this.type, this.id].join("/");
        return this.selector;
    }

    //returns [type, id]
    decompose(selector) {
        var sel = selector || this.selector;
        return sel ? sel.split("/") : [this.type, this.id];
    }
}

module.exports = DefaultSelector;