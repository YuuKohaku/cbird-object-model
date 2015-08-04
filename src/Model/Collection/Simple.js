'use strict'

var Abstract = require("./Abstract");
var _ = require("lodash");
var Promise = require("bluebird");
var ModelObject = require("../Object/");
var DefaultSelector = ModelObject.Selector.Default;

class SimpleCollection extends Abstract {
    constructor(params) {
        super(params);
        this.keys = _.isArray(params) ? params : [];
    }

    load_from_db() {
        var promises = _.map(this.keys, (key) => {
            var ob_key = key;
            var obj = false;
            if (_.isObject(key)) {
                if (!key.selector || !key.id)
                    throw new Error("Specify key object as {id: 'example/1', selector: 'Example'}");
                var Selector = ModelObject.Selector[_.capitalize(key.selector)];
                ob_key = key.id;
                if (!Selector)
                    throw new Error("Specified selector not found.");
                var type = Selector.decompose(ob_key).type;
                var obj_class = ModelObject[_.capitalize(type)] || ModelObject.Abstract;
                console.log("Creating object of type ", type, " with selector ", key.selector)
                obj = new obj_class(ob_key, key.selector);
            } else {
                var type = DefaultSelector.decompose(key).type;
                console.log("Creating object of type ", type);
                var obj_class = ModelObject[_.capitalize(type)];
                if (!obj_class) {
                    obj = new ModelObject.Abstract(ob_key, type);
                } else {
                    obj = new obj_class(ob_key);
                }
            }
            return obj.get_from_database()
                .then(() => {
                    this.collection[ob_key] = obj;
                });
        });

        return Promise.all(promises);
    }
}

module.exports = SimpleCollection;