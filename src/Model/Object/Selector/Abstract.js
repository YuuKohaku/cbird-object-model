'use strict'

class AbstractSelector {
    constructor(params) {
        this.selector = false;
        try {
            for (var i in params) {
                this[i] = params[i];
            }
        } catch (e) {
            throw new Error("Wrong params passed to Selector constructor: " + e.message);
        }
    }

    compose() {
        throw new Error("Abstract method.")
    }

    decompose() {
        throw new Error("Abstract method.")
    }
}

module.exports = AbstractSelector;