module.exports = function (db) {
    var modules = {
        Object: require("./Object"),
        Map: require("./Map"),
        Collection: require("./Collection")
    };
    for (var i in modules) {
        modules[i] = modules[i](db);
    }
    return modules;
}