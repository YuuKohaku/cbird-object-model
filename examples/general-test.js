'use strict'

var Couchbird = require("Couchbird")({
    server_ip: "127.0.0.1",
    n1ql: "127.0.0.1:8093"
}).bucket("mt");
var Model = require("./Model")(Couchbird);


var sch = new Model.Object.Schedule("schedule/1");
console.log(sch.selector, sch.type, sch.id, sch);

sch.get_from_database()
    .then((res) => {
        console.log('res: ', res);
        return sch.insert();
    });