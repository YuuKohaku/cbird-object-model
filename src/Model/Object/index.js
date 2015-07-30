module.exports = function (db) {
    var modules = {
        Abstract: require("./Abstract"),
        Schedule: require("./Schedule")
    };
    modules.Abstract.set_database(db);
    return modules;
}