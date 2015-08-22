let Model = require("./Model");

module.exports = function (db) {
    //    let modules = {
    //        Object: require("./Object"),
    //        Collection: require("./Collection")
    //    };
    var model = new Model();
    //    model.init(modules);
    model.initByDirectorySync(__dirname);
    model.setDatabase(db);
    return model;
}