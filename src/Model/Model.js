let _ = require("lodash");
let Promise = require("bluebird");
let fs = require("fs");
let pfs = Promise.promisifyAll(fs);
let path = require("path");

class ModelLoader {
    constructor() {}

    load(modules) {
        return _.transform(modules, (result, m, key) => {
            result[key] = _.isObject(m) ? m : require(m);
        });
    }

    loadByDirectory(dir) {
        console.log("Loading dir ", dir);
        return pfs.statAsync(dir)
            .then((res) => {
                //                console.log("Stat ", res);
                if (!res.isFile() && !res.isDirectory()) {
                    return Promise.reject(false);
                }
                try {
                    var ret = require(dir);
                    console.log("Direct require ", dir);
                    return Promise.resolve(ret);
                } catch (e) {
                    console.log("Direct require not passed for", dir, e.message);
                    if (res.isFile())
                        return Promise.resolve({
                            reason: e.message
                        });
                }
                return pfs.readdirAsync(dir)
                    .then((files) => {
                        var ret = _.reduce(files, (result, n) => {
                            //                            console.log("File", n, result);
                            result[path.parse(n).name] = this.loadByDirectory(path.resolve(dir, n));
                            return result;
                        }, {});
                        console.log("Dir ", dir, "\nFiles: ", files);
                        return Promise.props(ret);
                    })

            });
    }


    loadByDirectorySync(dir) {
        console.log("Loading dir ", dir);
        let stats = fs.statSync(dir);
        console.log("Stat ", stats);
        if (!stats.isFile() && !stats.isDirectory()) {
            return {};
        }
        try {
            let ret = require(dir);
            console.log("Direct require ", dir);
            return ret;
        } catch (e) {
            console.log("Direct require not passed for", dir, e.message);
            if (stats.isFile())
                return {
                    reason: e.message
                };
        }
        let files = fs.readdirSync(dir);
        let ret = _.reduce(files, (result, n) => {
            console.log("File", n, result);
            result[path.parse(n).name] = this.loadByDirectorySync(path.resolve(dir, n));
            return result;
        }, {});
        console.log("Dir ", dir, "\nFiles: ", files);
        return ret;
    }
}

class Model {
    constructor() {
        this.loader = new ModelLoader();
        this.modules = {};
    }

    init(modules) {
        _.merge(this.modules, this.loader.load(modules));
        _.merge(this, this.modules);
        return this;
    }

    initByDirectory(dir) {
        return this.loader.loadByDirectory(dir)
            .then((res) => {
                _.merge(this.modules, res);
                _.merge(this, this.modules);
                console.log("Loaded:", this.modules);
                return Promise.resolve(this);
            })
            .catch((err) => {
                console.log("Error while loading:", err);
                return Promise.resolve(false);
            });
    }
    initByDirectorySync(dir) {
        let res = this.loader.loadByDirectorySync(dir);
        _.merge(this.modules, res);
        _.merge(this, this.modules);
        console.log("Loaded:", this.modules);
        return this;
    }

    setDatabase(db) {
        _.map(_.filter(this.modules, "Abstract"), (el) => {

            el.Abstract.setDatabase(db);
        });
        return this;
    }
}

export default Model;