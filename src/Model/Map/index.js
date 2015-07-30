module.exports = function (db) {
    var modules = {
        Abstract: require("./Abstract"),
        Simple: require("./Simple")
    };
    modules.Abstract.set_database(db);
    return modules;
}