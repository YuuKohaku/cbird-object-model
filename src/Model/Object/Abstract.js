/*jslint couch: true, devel: true, node: true*/
'use strict'

var Promise = require("bluebird");
var _ = require("lodash");

var bucket = false;

class Abstract {

    constructor(db_selector, selector) {
        var db_id = false;
        var type = false;
        var id = false;

        if (_.isNumber(db_selector)) {
            type = _.snakeCase(this.constructor.name);
            id = db_selector;
        } else {
            db_id = db_selector;
        }

        var sel = selector || this.constructor.name;

        this.db = bucket; //should be already initialized
        this.scheme = false; //no scheme for abstract
        this.cas = false; //still unknown but probably existing

        //sets selector object, database selector(db_id), type and id for this
        this.set_selector(sel, {
            db: db_id,
            type: type,
            id: id
        });

        //no db loading in constructor
        return this;
    }

    static set_database(db) {
        bucket = db;
    }

    //selector name and params {db: db_id, type: type, id: id}. Specify either db or type and id. Db is priority.
    set_selector(name, params) {
        var Selector = false;
        try {
            Selector = require(__dirname + "/Selector/" + name);
        } catch (e) {
            Selector = require(__dirname + "/Selector/Default");
        }
        this._selector = new Selector(params);

        Object.defineProperties(this, {
            "_selector": {
                configurable: false,
                writable: true,
                enumerable: false
            },
            "selector": {
                get: function () {
                    return this._selector.compose();
                },
                set: function (value) {
                    return false;
                },
                enumerable: false
            },
            "type": {
                get: function () {
                    return this._selector.decompose()[0];
                },
                set: function (value) {
                    return false;
                },
                enumerable: false
            },
            "id": {
                get: function () {
                    return this._selector.decompose()[1];
                },
                set: function (value) {
                    return false;
                },
                enumerable: false
            }
        });
    }

    get_from_database() {
        return this.db.get(this.selector)
            .then((res) => {
                //return from db
                this.cas = res.cas;
                this.db_value = res.value;
                _.merge(this, res.value);
                return Promise.resolve(this);
            })
            .catch((err) => {
                console.log('Could not get from db: ', err);
                return Promise.resolve(this);
            });
    }

    insert(data) {
        var val = data;
        if (!val) {
            val = _.cloneDeep(this.scheme);
            _.merge(val, this);
        }
        return this.db.insert(this.selector, val)
            .then((res) => {
                //return from db
                this.cas = res.cas;
                this.db_value = val;
                return Promise.resolve(this);
            });
    }

    upsert(data) {
        var val = data;
        if (!val) {
            val = this.db_value;
            _.merge(val, this);
        }
        return this.db.insert(this.selector, val, {
                cas: this.cas
            })
            .then((res) => {
                //return from db
                this.cas = res.cas;
                return Promise.resolve(this);
            });
    }

    remove() {
        return this.db.remove(this.selector)
            .then((res) => {
                return Promise.resolve(this);
            })
            .catch((err) => {
                console.log('Could not remove from db: ', err);
                return Promise.resolve(this);
            });
    }
}

module.exports = Abstract;