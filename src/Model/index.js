var _ = require("lodash");

module.exports = function (db) {
    var modules = {
        Object: require("./Object"),
        Map: require("./Map"),
        Collection: require("./Collection")
    };
    _.map(_.filter(modules, "Abstract"), (el) => {
        el.Abstract.set_database(db);
    })
    return modules;
}